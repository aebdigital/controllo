import { NextResponse } from "next/server";
import Stripe from "stripe";
import { issueInvoiceForPaidCheckout } from "../../../../lib/superfaktura";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secretKey || !webhookSecret) {
    console.error("Stripe webhook secrets are not configured.");
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 500 }
    );
  }

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const stripe = new Stripe(secretKey);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook signature.";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== "paid") {
    return NextResponse.json({
      received: true,
      payment_status: session.payment_status,
    });
  }

  try {
    const invoice = await issueInvoiceForPaidCheckout(session, event.created);
    console.info(
      `SuperFaktura invoice ${invoice.id} processed for Stripe session ${session.id}.`
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invoice processing failed.";
    console.error(
      `Failed to process SuperFaktura invoice for Stripe session ${session.id}:`,
      message
    );

    // A non-2xx response makes Stripe retry the event.
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
