/**
 * Vercel Node serverless: POST /api/contact
 * Body JSON: { name, email, phone, message }
 */
import processContact from "../lib/processContact.mjs";

function sendJson(res, status, obj) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.statusCode = status;
  res.end(JSON.stringify(obj));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { ok: false, error: "Method not allowed" });
  }

  let body = req.body;
  if (body == null || typeof body === "string") {
    try {
      body = JSON.parse(typeof body === "string" ? body : "{}");
    } catch {
      return sendJson(res, 400, { ok: false, error: "Invalid JSON" });
    }
  }

  try {
    const result = await processContact(body);
    return sendJson(res, result.ok ? 200 : 400, result);
  } catch (e) {
    console.error("[contact] handler error:", e);
    return sendJson(res, 500, { ok: false, error: "Server error" });
  }
}
