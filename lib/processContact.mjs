/**
 * Shared contact submission: Resend (email to Kelly) + Twilio (SMS alert).
 * Used by Vercel serverless `api/contact.mjs` and local dev server.
 */
import { Resend } from "resend";
import twilio from "twilio";

const MAX_MESSAGE = 8000;
const MAX_NAME = 200;

function stripHtmlish(s) {
  return String(s).replace(/[<>]/g, "");
}

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function phoneDigits(s) {
  return String(s).replace(/\D/g, "");
}

/** Strip BOM / outer whitespace from env-backed secrets. */
function normalizeEnvSecret(value) {
  if (value == null) return "";
  return String(value).replace(/^\uFEFF/, "").trim();
}

/**
 * @param {Record<string, unknown>} body
 * @returns {Promise<{ ok: true } | { ok: false, error: string }>}
 */
export default async function processContact(body) {
  const name = stripHtmlish(body?.name ?? "").trim();
  const email = stripHtmlish(body?.email ?? "").trim();
  const phone = stripHtmlish(body?.phone ?? "").trim();
  const message = stripHtmlish(body?.message ?? "").trim();

  if (!name || name.length > MAX_NAME) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  const digits = phoneDigits(phone);
  if (digits.length < 10) {
    return { ok: false, error: "Please enter a valid phone number (at least 10 digits)." };
  }
  if (!message) {
    return { ok: false, error: "Please enter a message." };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: "Message is too long." };
  }

  const resendKey = normalizeEnvSecret(process.env.RESEND_API_KEY);
  const resendFrom = normalizeEnvSecret(process.env.RESEND_FROM_EMAIL);
  const toEmail = normalizeEnvSecret(process.env.CONTACT_TO_EMAIL);

  const twSid = process.env.TWILIO_ACCOUNT_SID;
  const twToken = process.env.TWILIO_AUTH_TOKEN;
  const twFrom = process.env.TWILIO_FROM_NUMBER;
  const twTo = process.env.TWILIO_TO_NUMBER;

  if (!resendKey || !resendFrom || !toEmail) {
    console.error("[contact] Missing Resend or CONTACT_TO_EMAIL env");
    return { ok: false, error: "Contact form is not configured (email)." };
  }
  if (!twSid || !twToken || !twFrom || !twTo) {
    console.error("[contact] Missing Twilio env");
    return { ok: false, error: "Contact form is not configured (SMS)." };
  }

  const emailText = [
    "New message from kellyspeterson.com contact form",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const smsBody = `Website inquiry: ${name} (${email}) sent a message. Check email for full text.`;

  try {
    const resend = new Resend(resendKey);
    const { error: resendErr } = await resend.emails.send({
      from: resendFrom,
      to: toEmail,
      replyTo: email,
      subject: `Website inquiry from ${name}`,
      text: emailText,
    });
    if (resendErr) {
      console.error("[contact] Resend error:", {
        message: resendErr.message,
        name: resendErr.name,
      });
      return { ok: false, error: "Could not send email. Please try again later." };
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[contact] Resend exception:", msg);
    return { ok: false, error: "Could not send email. Please try again later." };
  }

  try {
    const client = twilio(twSid, twToken);
    await client.messages.create({
      body: smsBody.slice(0, 1500),
      from: twFrom,
      to: twTo,
    });
  } catch (e) {
    console.error("[contact] Twilio error:", e);
    return {
      ok: false,
      error: "Your message was not fully delivered. Please call or try again shortly.",
    };
  }

  return { ok: true };
}
