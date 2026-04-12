/**
 * Local dev API for POST /api/contact (SendGrid + Twilio).
 * Run alongside Vite; vite.config proxies /api/contact -> this server.
 *
 * Loads repo-root `.env` with `override: true` so file values replace any
 * stale SENDGRID_* / TWILIO_* already in the process environment (shell or OS).
 * Otherwise dotenv skips those keys and SendGrid can see a wrong key → 401.
 */
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import processContact from "../lib/processContact.mjs";

/** Repo root `.env` only — `.env.example` is never read by this process (template for humans). */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env");
const envResult = dotenv.config({ path: envPath, override: true });

function redactedSendGridEnvLog() {
  const raw = process.env.SENDGRID_API_KEY;
  const key = raw == null ? "" : String(raw).replace(/^\uFEFF/, "").trim();
  console.log("[contact-api] SendGrid env (redacted, local dev only):", {
    dotenvPath: envPath,
    dotenvFileExists: fs.existsSync(envPath),
    dotenvLoaded: !envResult.error,
    sendgridApiKeyPresent: Boolean(key),
    sendgridApiKeyPrefix12: key.slice(0, 12),
    sendgridFromEmail: String(process.env.SENDGRID_FROM_EMAIL ?? "").trim(),
  });
}

if (envResult.error) {
  console.warn("[contact-api] Could not load .env:", envResult.error.message);
}
redactedSendGridEnvLog();

const PORT = Number(process.env.CONTACT_API_PORT || 8788);

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/contact") {
    const chunks = [];
    for await (const ch of req) chunks.push(ch);
    const raw = Buffer.concat(chunks).toString("utf8");
    let body;
    try {
      body = JSON.parse(raw || "{}");
    } catch {
      res.writeHead(400, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      return res.end(JSON.stringify({ ok: false, error: "Invalid JSON" }));
    }
    try {
      const result = await processContact(body);
      res.writeHead(result.ok ? 200 : 400, {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      });
      return res.end(JSON.stringify(result));
    } catch (e) {
      console.error("[contact-dev]", e);
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ ok: false, error: "Server error" }));
    }
  }
  res.writeHead(404).end();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[contact-api] POST http://127.0.0.1:${PORT}/api/contact`);
});
