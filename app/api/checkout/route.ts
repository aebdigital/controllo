import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    const { name, email, phone, adUrl, note } = await request.json();

    // Standard Next.js server-side check for API keys
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      new URL(request.url).origin;

    if (!secretKey) {
      console.warn(
        "Stripe key STRIPE_SECRET_KEY is missing from environment. Operating in mock checkout mode."
      );
      // Return a mock checkout redirection for local testing without stripe setup
      return NextResponse.json({
        mock: true,
        message: "Stripe integration is prepped! Add STRIPE_SECRET_KEY to .env.local to enable real checkout.",
        url: `${origin}/?payment=mock_success&name=${encodeURIComponent(name || "")}`,
      });
    }

    // Initialize Stripe client
    const stripe = new Stripe(secretKey);

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "150-Bodová Kontrola Vozidla",
              description: `Kontrola vozidla pre: ${name}. Odkaz: ${adUrl || "Neuvedený"}`,
            },
            unit_amount: 50, // TEST PRICE 0.50 EUR — revert to 15900 (159.00 EUR) before launch
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email || undefined,
      billing_address_collection: "required",
      metadata: {
        customer_name: name || "",
        customer_phone: phone || "",
        ad_url: adUrl || "",
        notes: note || "",
      },
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error creating stripe checkout session:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
