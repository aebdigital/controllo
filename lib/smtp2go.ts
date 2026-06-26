const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";

type SendEmailInput = {
  to: string;
  subject: string;
  textBody: string;
  htmlBody?: string;
  replyTo?: string;
};

type Smtp2goResponse = {
  data?: {
    succeeded?: number;
    failed?: number;
    error?: string;
    error_code?: string;
    field_validation_errors?: unknown;
  };
};

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export async function sendEmail({
  to,
  subject,
  textBody,
  htmlBody,
  replyTo,
}: SendEmailInput) {
  const apiKey = requiredEnv("SMTP2GO_API_KEY");
  const sender = requiredEnv("SMTP2GO_SENDER");

  const response = await fetch(SMTP2GO_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Smtp2go-Api-Key": apiKey,
    },
    cache: "no-store",
    body: JSON.stringify({
      sender,
      to: [to],
      subject,
      text_body: textBody,
      ...(htmlBody ? { html_body: htmlBody } : {}),
      // custom_headers lets the recipient (info@controllo.sk) reply straight
      // to the person who submitted the form.
      ...(replyTo
        ? { custom_headers: [{ header: "Reply-To", value: replyTo }] }
        : {}),
    }),
  });

  const text = await response.text();
  let payload: Smtp2goResponse;

  try {
    payload = JSON.parse(text) as Smtp2goResponse;
  } catch {
    throw new Error(
      `SMTP2GO returned a non-JSON response (${response.status}).`
    );
  }

  if (!response.ok || payload.data?.error || !payload.data?.succeeded) {
    throw new Error(
      `SMTP2GO could not send the email: ${JSON.stringify(
        payload.data || text.slice(0, 500)
      )}`
    );
  }

  return payload.data;
}
