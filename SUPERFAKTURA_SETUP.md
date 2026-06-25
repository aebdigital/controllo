# Stripe + SuperFaktura setup

The invoice flow is handled only by the verified Stripe webhook:

1. The customer pays through Stripe Checkout.
2. Stripe calls `POST /api/stripe/webhook`.
3. The webhook verifies the Stripe signature and checks that the Checkout
   Session is paid.
4. A paid card invoice is created in SuperFaktura.
5. SuperFaktura emails the PDF invoice to the customer.

## SuperFaktura

For testing, create an account at:

https://sandbox.superfaktura.sk/registracia

Get the API email, key, and optional company ID from:

https://sandbox.superfaktura.sk/api_access

Use these values during sandbox testing:

```env
SUPERFAKTURA_BASE_URL=https://sandbox.superfaktura.sk
SUPERFAKTURA_EMAIL=
SUPERFAKTURA_API_KEY=
SUPERFAKTURA_COMPANY_ID=
SUPERFAKTURA_MODULE=Controllo Web 1.0
SUPERFAKTURA_TAX_RATE=
SUPERFAKTURA_INVOICE_LANGUAGE=slo
SUPERFAKTURA_SEND_EMAIL=true
```

`SUPERFAKTURA_TAX_RATE` must match the seller's real VAT status. Use `0` only
if the seller is not a VAT payer. Confirm the correct rate with the accountant
before enabling live invoices.

For production, change the base URL:

```env
SUPERFAKTURA_BASE_URL=https://moja.superfaktura.sk
```

## Stripe

Add a webhook endpoint in Stripe Dashboard:

```text
https://YOUR-DOMAIN.sk/api/stripe/webhook
```

Subscribe it to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Copy the endpoint signing secret into:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN.sk
```

Use test Stripe keys with the SuperFaktura sandbox. Switch both systems to
production credentials together.

## Verification

After a successful test payment, check:

1. Stripe reports a successful webhook delivery.
2. SuperFaktura contains exactly one invoice with the Stripe Checkout Session
   ID in the order number.
3. The invoice is marked as paid by card.
4. The customer receives the invoice PDF by email.

The Checkout Session ID is used as an idempotency key. Stripe retries therefore
find the existing invoice instead of creating a second one.
