import type Stripe from "stripe";

const DEFAULT_BASE_URL = "https://moja.superfaktura.sk";
const DEFAULT_LANGUAGE = "slo";
const MODULE_NAME = "Controllo Web 1.0";

type SuperFakturaInvoiceResponse = {
  data?: {
    Invoice?: {
      id?: string | number;
      invoice_no_formatted?: string;
    };
  };
  error?: number;
  error_message?: unknown;
  message?: string;
};

type SuperFakturaInvoiceListResponse = {
  items?: Array<{
    Invoice?: {
      id?: string | number;
    };
    InvoiceEmail?: unknown[];
  }>;
};

type InvoiceResult = {
  id: number;
  alreadySent: boolean;
};

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getConfig() {
  const taxRate = Number(requiredEnv("SUPERFAKTURA_TAX_RATE"));

  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
    throw new Error("SUPERFAKTURA_TAX_RATE must be a number from 0 to 100.");
  }

  return {
    apiKey: requiredEnv("SUPERFAKTURA_API_KEY"),
    baseUrl: (process.env.SUPERFAKTURA_BASE_URL || DEFAULT_BASE_URL).replace(
      /\/$/,
      ""
    ),
    companyId: process.env.SUPERFAKTURA_COMPANY_ID?.trim(),
    email: requiredEnv("SUPERFAKTURA_EMAIL"),
    language:
      process.env.SUPERFAKTURA_INVOICE_LANGUAGE?.trim() || DEFAULT_LANGUAGE,
    module: process.env.SUPERFAKTURA_MODULE?.trim() || MODULE_NAME,
    sendEmail: process.env.SUPERFAKTURA_SEND_EMAIL !== "false",
    taxRate,
  };
}

function authorizationHeader(config: ReturnType<typeof getConfig>) {
  const credentials = new URLSearchParams({
    email: config.email,
    apikey: config.apiKey,
    module: config.module,
  });

  if (config.companyId) {
    credentials.set("company_id", config.companyId);
  }

  return `SFAPI ${credentials.toString()}`;
}

async function superfakturaRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const config = getConfig();
  const response = await fetch(`${config.baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: authorizationHeader(config),
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    cache: "no-store",
  });

  const text = await response.text();
  let payload: T;

  try {
    payload = JSON.parse(text) as T;
  } catch {
    throw new Error(
      `SuperFaktura returned a non-JSON response (${response.status}).`
    );
  }

  if (!response.ok) {
    throw new Error(
      `SuperFaktura request failed (${response.status}): ${text.slice(0, 500)}`
    );
  }

  return payload;
}

function paymentTimestamp(unixSeconds: number) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Bratislava",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(unixSeconds * 1000));
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || "";
  const date = `${value("year")}-${value("month")}-${value("day")}`;

  return {
    date,
    dateTime: `${date} ${value("hour")}:${value("minute")}:${value("second")}`,
  };
}

function customerAddress(session: Stripe.Checkout.Session) {
  const address = session.customer_details?.address;

  return {
    address: address?.line2
      ? `${address.line1 || ""}, ${address.line2}`.replace(/^, |, $/g, "")
      : address?.line1 || "",
    city: address?.city || "",
    country_iso_id: address?.country || "SK",
    zip: address?.postal_code || "",
  };
}

async function findInvoiceByOrderNumber(
  orderNumber: string
): Promise<InvoiceResult | null> {
  const path = [
    "/invoices/index.json",
    "type:regular",
    `order_no:${encodeURIComponent(orderNumber)}`,
    "per_page:1",
  ].join("/");
  const response = await superfakturaRequest<SuperFakturaInvoiceListResponse>(
    path
  );
  const match = response.items?.[0];
  const invoiceId = Number(match?.Invoice?.id);

  if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
    return null;
  }

  return {
    id: invoiceId,
    alreadySent: Boolean(match?.InvoiceEmail?.length),
  };
}

async function registerPayment(
  invoiceId: number,
  amount: number,
  currency: string,
  paidOn: string
) {
  const response = await superfakturaRequest<SuperFakturaInvoiceResponse>(
    "/invoice_payments/add",
    {
      method: "POST",
      body: JSON.stringify({
        InvoicePayment: {
          invoice_id: invoiceId,
          payment_type: "card",
          amount,
          currency,
          created: paidOn,
        },
      }),
    }
  );

  if (response.error) {
    throw new Error(
      `SuperFaktura could not register the payment: ${JSON.stringify(
        response.error_message || response.message || response
      )}`
    );
  }
}

async function createPaidInvoice(
  session: Stripe.Checkout.Session,
  paidAt: number
): Promise<InvoiceResult> {
  const config = getConfig();
  const totalInCents = session.amount_total;

  if (!totalInCents || totalInCents <= 0) {
    throw new Error(`Stripe session ${session.id} has no payable total.`);
  }

  const total = totalInCents / 100;
  const currency = (session.currency || "eur").toUpperCase();
  const unitPrice =
    config.taxRate === 0 ? total : total / (1 + config.taxRate / 100);
  const { date } = paymentTimestamp(paidAt);
  const customerEmail =
    session.customer_details?.email || session.customer_email;
  const customerName =
    session.customer_details?.name ||
    session.metadata?.customer_name ||
    customerEmail ||
    "Zákazník";

  const response = await superfakturaRequest<SuperFakturaInvoiceResponse>(
    "/invoices/create",
    {
      method: "POST",
      body: JSON.stringify({
        Invoice: {
          name: "Kontrola vozidla pred kúpou",
          type: "regular",
          created: date,
          delivery: date,
          due: date,
          payment_type: "card",
          invoice_currency: currency,
          order_no: session.id,
          internal_comment: [
            `Stripe Checkout Session: ${session.id}`,
            session.payment_intent
              ? `Stripe PaymentIntent: ${String(session.payment_intent)}`
              : "",
            session.metadata?.ad_url
              ? `Inzerát: ${session.metadata.ad_url}`
              : "",
            session.metadata?.notes
              ? `Poznámka: ${session.metadata.notes}`
              : "",
          ]
            .filter(Boolean)
            .join("\n"),
        },
        InvoiceItem: [
          {
            name: "150-bodová kontrola vozidla",
            description: session.metadata?.ad_url
              ? `Kontrola vozidla z inzerátu: ${session.metadata.ad_url}`
              : "Kompletná kontrola vozidla pred kúpou",
            quantity: 1,
            unit: "ks",
            unit_price: Number(unitPrice.toFixed(6)),
            tax: config.taxRate,
          },
        ],
        Client: {
          name: customerName,
          email: customerEmail || "",
          phone:
            session.customer_details?.phone ||
            session.metadata?.customer_phone ||
            "",
          ...customerAddress(session),
          update_addressbook: 1,
        },
        InvoiceSetting: {
          language: config.language,
          payment_info: false,
          online_payment: false,
        },
      }),
    }
  );

  if (response.error) {
    throw new Error(
      `SuperFaktura could not create invoice: ${JSON.stringify(
        response.error_message || response.message || response
      )}`
    );
  }

  const invoiceId = Number(response.data?.Invoice?.id);

  if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
    throw new Error("SuperFaktura created an invoice without returning its ID.");
  }

  // Register the card payment so the invoice (and its PDF) shows as fully paid.
  await registerPayment(invoiceId, total, currency, date);

  return { id: invoiceId, alreadySent: false };
}

async function sendInvoice(invoiceId: number, recipient: string) {
  const config = getConfig();
  const response = await superfakturaRequest<SuperFakturaInvoiceResponse>(
    "/invoices/send",
    {
      method: "POST",
      body: JSON.stringify({
        Email: {
          invoice_id: invoiceId,
          to: recipient,
          pdf_language: config.language,
        },
      }),
    }
  );

  if (response.error) {
    throw new Error(
      `SuperFaktura could not send invoice: ${JSON.stringify(
        response.error_message || response.message || response
      )}`
    );
  }
}

export async function issueInvoiceForPaidCheckout(
  session: Stripe.Checkout.Session,
  paidAt: number
) {
  if (session.payment_status !== "paid") {
    throw new Error(
      `Stripe session ${session.id} is not paid (${session.payment_status}).`
    );
  }

  const config = getConfig();
  const recipient =
    session.customer_details?.email || session.customer_email;
  const existingInvoice = await findInvoiceByOrderNumber(session.id);
  const invoice =
    existingInvoice || (await createPaidInvoice(session, paidAt));

  if (config.sendEmail && recipient && !invoice.alreadySent) {
    await sendInvoice(invoice.id, recipient);
  }

  return invoice;
}
