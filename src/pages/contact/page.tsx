import { FormEvent, useState } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";

const CONTACT_EMAIL = "kellykaypeterson@gmail.com";
const PHONE_DISPLAY = "949-556-5378";

function contactApiUrl(): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;
  const path = "/api/contact";
  if (!base) return path;
  return `${base}${path}`;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSubmitState("loading");
    try {
      const res = await fetch(contactApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setSubmitState("error");
        return;
      }
      setSubmitState("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setErrorMessage("Network error. Check your connection or try again later.");
      setSubmitState("error");
    }
  }

  return (
    <div className="min-h-screen font-['Inter'] bg-[#FAFAF8]">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#FAFAF8] pt-32 pb-16 md:pb-20 border-b border-[#E8E0D0]/50">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">Get in Touch</p>
          <h1 className="font-['Crimson_Pro'] text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#2D2D2D] mb-6 leading-tight text-balance">
            Let&apos;s talk about what your students need most.
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed font-['Inter'] text-pretty">
            Every classroom is different. I&apos;m always open to thoughtful conversations about student support, collaboration,
            and what&apos;s actually working.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="max-w-2xl mx-auto mb-12 md:mb-14 text-center text-base md:text-lg text-[#5a554c] leading-relaxed font-['Inter'] font-medium text-pretty px-1 sm:px-0">
            If something you read resonated with you, I&apos;d love to hear about your students and what you&apos;re seeing.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Email — no mailto; form is the path */}
            <div className="order-2 flex flex-col rounded-2xl border border-[#E4E1DA] bg-white p-8 md:p-9 shadow-[0_2px_20px_-10px_rgba(30,58,95,0.08)] lg:order-1">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1E3A5F]/[0.08] text-[#1E3A5F]">
                <i className="ri-mail-line text-xl" aria-hidden />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] mb-2">Email</h2>
              <p className="text-lg font-semibold text-[#2D2D2D] break-all select-text">{CONTACT_EMAIL}</p>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                For new inquiries, use the{" "}
                <a href="#contact-form" className="font-medium text-[#1E3A5F] hover:underline">
                  contact form
                </a>{" "}
                so your message reaches me reliably.
              </p>
            </div>

            {/* Phone — display only (no tel: link) so the OS does not show “Pick an app?” */}
            <div className="order-1 relative flex flex-col rounded-2xl border-2 border-[#1E3A5F]/22 bg-gradient-to-b from-[#FAF8F5] to-[#F0EBE4] p-8 md:p-9 shadow-[0_8px_32px_-14px_rgba(30,58,95,0.16)] ring-1 ring-[#1E3A5F]/[0.08] transition-shadow duration-300 hover:shadow-[0_10px_36px_-12px_rgba(30,58,95,0.2)] lg:order-2">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1E3A5F]/[0.12] text-[#1E3A5F]">
                <i className="ri-phone-line text-xl" aria-hidden />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] mb-2">Call Kelly</h2>
              <p
                className="text-lg font-semibold text-[#2D2D2D] select-text cursor-text"
                translate="no"
                title="Dial this number from your phone"
              >
                {PHONE_DISPLAY}
              </p>
              <p className="mt-4 text-sm font-medium text-[#4a4a4a] leading-relaxed">Most people start here.</p>
            </div>

            {/* Form */}
            <div className="order-3 flex flex-col rounded-2xl border border-[#E4E1DA] bg-white p-8 md:p-9 shadow-[0_2px_20px_-10px_rgba(30,58,95,0.08)] lg:row-span-1 lg:order-3">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1E3A5F]/[0.08] text-[#1E3A5F]">
                <i className="ri-chat-3-line text-xl" aria-hidden />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] mb-3">Send a message</h2>
              <p className="mb-5 text-sm text-[#5c574e] leading-snug font-['Inter']">Include your phone number so I can follow up if needed.</p>
              <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-[#E0DED8] bg-[#FAFAF8]/80 px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-gray-400 outline-none transition-shadow focus:border-[#1E3A5F]/40 focus:ring-2 focus:ring-[#1E3A5F]/15"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email for my reply"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-[#E0DED8] bg-[#FAFAF8]/80 px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-gray-400 outline-none transition-shadow focus:border-[#1E3A5F]/40 focus:ring-2 focus:ring-[#1E3A5F]/15"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    autoComplete="tel"
                    required
                    className="w-full rounded-xl border border-[#E0DED8] bg-[#FAFAF8]/80 px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-gray-400 outline-none transition-shadow focus:border-[#1E3A5F]/40 focus:ring-2 focus:ring-[#1E3A5F]/15"
                  />
                </div>
                <div className="flex-1 min-h-[120px]">
                  <label htmlFor="contact-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like me to know?"
                    rows={4}
                    required
                    className="w-full min-h-[120px] resize-y rounded-xl border border-[#E0DED8] bg-[#FAFAF8]/80 px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-gray-400 outline-none transition-shadow focus:border-[#1E3A5F]/40 focus:ring-2 focus:ring-[#1E3A5F]/15"
                  />
                </div>
                {submitState === "error" && errorMessage ? (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3" role="alert">
                    {errorMessage}
                  </p>
                ) : null}
                {submitState === "success" ? (
                  <p className="text-sm text-[#1E5a3a] bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                    Thank you — your message was sent. I&apos;ll get back to you as soon as I can.
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="mt-1 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#1E3A5F] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#162d4a] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitState === "loading" ? "Sending…" : "Send message"}
                </button>
              </form>
            </div>
          </div>

          <p className="mt-14 md:mt-16 max-w-2xl mx-auto text-center text-sm md:text-base text-[#555] leading-relaxed text-pretty px-1 sm:px-0">
            Every message is read personally. I value thoughtful, respectful communication and will respond as soon as I can.
          </p>

          <p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
            Based in Mission Viejo, CA.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
