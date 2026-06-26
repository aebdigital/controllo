import { NextResponse } from "next/server";
import { sendEmail } from "../../../lib/smtp2go";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vyplňte prosím meno, e-mail a správu." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Zadajte platnú e-mailovú adresu." },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_FORM_RECIPIENT?.trim();

    if (!recipient) {
      console.error("CONTACT_FORM_RECIPIENT is not configured.");
      return NextResponse.json(
        { error: "Kontaktný formulár nie je nakonfigurovaný." },
        { status: 500 }
      );
    }

    const lines = [
      `Meno: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefón: ${phone}` : "",
      "",
      "Správa:",
      message,
    ].filter((line) => line !== "");

    await sendEmail({
      to: recipient,
      replyTo: email,
      subject: `Nová správa z kontaktného formulára – ${name}`,
      textBody: lines.join("\n"),
      htmlBody: `
        <h2>Nová správa z kontaktného formulára</h2>
        <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefón:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Správa:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const messageText =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("Contact form submission failed:", messageText);
    return NextResponse.json(
      { error: "Správu sa nepodarilo odoslať. Skúste to znova neskôr." },
      { status: 500 }
    );
  }
}
