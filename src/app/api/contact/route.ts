import { NextRequest, NextResponse } from "next/server";

// Handles the contact form during Phase 1 (frontend-only deploy).
// Uses Resend to email submissions straight to MARVEELIGHT — no backend
// required yet. Once the Python admin portal exists in Phase 2, this route
// can optionally also persist submissions there.
//
// Setup:
//   1. Create a free Resend account (resend.com) and verify a sending domain.
//   2. Add these to Vercel project env vars:
//        RESEND_API_KEY=...
//        CONTACT_TO_EMAIL=hello@marveelight.com (the real destination inbox)
//        CONTACT_FROM_EMAIL=noreply@yourverifieddomain.com

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, role, service, challenge, outcome, link } = body ?? {};

  if (!name || !email || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    // Not configured yet — log so submissions aren't silently lost during
    // development, but let the UI still show a friendly success state.
    console.warn("Contact form submitted, but RESEND_API_KEY / CONTACT_TO_EMAIL are not set.", body);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const html = `
    <h2>New MARVEELIGHT inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>What they do:</strong> ${escapeHtml(role)}</p>
    <p><strong>Service interested in:</strong> ${escapeHtml(service ?? "—")}</p>
    <p><strong>Current challenge:</strong><br/>${escapeHtml(challenge ?? "—")}</p>
    <p><strong>Desired outcome:</strong><br/>${escapeHtml(outcome ?? "—")}</p>
    <p><strong>Link:</strong> ${escapeHtml(link ?? "—")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `New inquiry from ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend error:", errText);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
