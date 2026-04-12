/**
 * Local dev API for POST /api/contact (SendGrid + Twilio).
 * Run alongside Vite; vite.config proxies /api/contact -> this server.
 * Loads `.env` from repo root when present (via dotenv).
 */
import "dotenv/config";
import http from "node:http";
import processContact from "../lib/processContact.mjs";

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
