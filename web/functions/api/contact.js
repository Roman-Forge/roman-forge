import { CONTACT_EMAIL, validateQuestion } from "../../src/lib/siteContact.ts";

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function oneLine(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

function providerMessage(raw) {
  let message = raw;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.message === "string") message = parsed.message;
  } catch {
    // Resend sometimes returns plain text.
  }
  return String(message)
    .replace(/re_[A-Za-z0-9_-]+/g, "[redacted]")
    .replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
    .slice(0, 300);
}

/**
 * Cloudflare Pages Function. Delivery uses Resend.
 * Required secret: YOUR_RESEND_API_KEY (Pages → Settings → Variables and Secrets),
 * on both Production and Preview. The from-address is CONTACT_EMAIL in
 * src/lib/siteContact.ts and must be allowed by the Resend domain or sender.
 */
export async function onRequestPost(context) {
  const apiKey = context.env.YOUR_RESEND_API_KEY;
  if (!apiKey || !String(apiKey).trim()) {
    console.error("Contact form: YOUR_RESEND_API_KEY is not set");
    return json({ error: "Failed to send message", reason: "missing_api_key" }, 500);
  }

  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Required fields missing" }, 400);
  }

  const result = validateQuestion(payload);
  if (!result.ok) {
    return json({ error: "Required fields missing", fields: result.errors }, 400);
  }

  const { name, business, email, hope } = result.value;
  const safeName = escapeHtml(name);
  const safeBusiness = escapeHtml(business);
  const safeEmail = escapeHtml(email);
  const safeHope = escapeHtml(hope).replace(/\r\n|\r|\n/g, "<br>");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Roman Forge Contact Form <${CONTACT_EMAIL}>`,
        to: CONTACT_EMAIL,
        reply_to: email,
        subject: `New question from ${oneLine(name)} (${oneLine(business)})`,
        html: `
          <h2>New question from the website</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Business:</strong> ${safeBusiness}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <h3>What they hope AI can help with</h3>
          <p>${safeHope}</p>
        `,
        text: [
          "New question from the website",
          `Name: ${name}`,
          `Business: ${business}`,
          `Email: ${email}`,
          "",
          "What they hope AI can help with:",
          hope,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend API error:", res.status, providerMessage(err));
      return json(
        {
          error: "Failed to send message",
          reason: "provider_rejected",
          providerStatus: res.status,
          providerMessage: providerMessage(err),
        },
        502,
      );
    }

    return json({ success: true }, 200);
  } catch (err) {
    console.error("Error sending email:", err);
    return json({ error: "Failed to send message", reason: "request_failed" }, 500);
  }
}
