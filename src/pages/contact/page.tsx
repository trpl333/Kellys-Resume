import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

function scrollToContactForm(smooth: boolean) {
  document.getElementById("contact-form")?.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "start",
    inline: "nearest",
  });
}

export default function ContactPage() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.hash !== "#contact-form") return;
    const t = window.setTimeout(() => scrollToContactForm(false), 0);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

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

      {/* Hero — tighter on lg so cards sit higher; mobile keeps comfortable touch targets */}
      <section className="border-b border-[#E8E0D0]/50 bg-gradient-to-b from-white to-[#FAFAF8] pt-24 pb-12 md:pt-28 md:pb-14 lg:pt-24 lg:pb-12">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] lg:mb-2">Get in Touch</p>
          <h1 className="mb-4 font-['Crimson_Pro'] text-4xl font-bold leading-tight text-[#2D2D2D] text-balance md:mb-5 md:text-5xl lg:mb-4 lg:text-[3.1rem]">
            Let&apos;s talk about what your students need most.
          </h1>
          <p className="text-pretty font-['Inter'] text-base leading-relaxed text-[#4A4A4A] md:text-lg lg:text-base lg:leading-snug">
            Every classroom is different. I&apos;m always open to thoughtful conversations about student support, collaboration,
            and what&apos;s actually working.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-10 md:py-12 lg:py-14">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="mx-auto mb-8 max-w-2xl px-1 text-center font-['Inter'] text-base font-medium leading-snug text-pretty text-[#5a554c] sm:px-0 md:mb-10 md:text-lg lg:mb-8 lg:max-w-3xl lg:text-base">
            If something you read resonated with you, I&apos;d love to hear about your students and what you&apos;re seeing.
          </p>

          {/* items-start: avoid grid row stretch to tallest card (form) so email/phone aren’t padded tall */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.52fr)_minmax(0,0.86fr)_minmax(0,1fr)] lg:gap-8">
            {/* Email — no mailto; form is the path */}
            <div className="order-2 flex min-w-0 flex-col rounded-2xl border border-[#E4E1DA] bg-white p-6 shadow-[0_2px_20px_-10px_rgba(30,58,95,0.08)] md:p-7 lg:order-1 lg:p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A5F]/[0.08] text-[#1E3A5F] lg:h-11 lg:w-11">
                <i className="ri-mail-line text-lg lg:text-xl" aria-hidden />
              </div>
              <h2 className="mb-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F]">Email</h2>
              <div className="min-w-0 lg:overflow-x-auto">
                <p className="select-text break-words text-base font-semibold leading-snug text-[#2D2D2D] sm:text-[1.05rem] lg:break-normal lg:text-[1rem] lg:leading-tight lg:whitespace-nowrap">
                  {CONTACT_EMAIL}
                </p>
              </div>
              <p className="mt-3 text-sm leading-snug text-gray-500 lg:mt-3.5">
                For new inquiries, use the{" "}
                <a
                  href="#contact-form"
                  className="font-medium text-[#1E3A5F] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToContactForm(true);
                  }}
                >
                  contact form
                </a>{" "}
                so your message reaches me reliably.
              </p>
            </div>

            {/* Phone — display only (no tel: link) so the OS does not show “Pick an app?” */}
            <div className="order-1 relative flex min-w-0 flex-col rounded-2xl border-2 border-[#1E3A5F]/22 bg-gradient-to-b from-[#FAF8F5] to-[#F0EBE4] p-6 shadow-[0_8px_32px_-14px_rgba(30,58,95,0.16)] ring-1 ring-[#1E3A5F]/[0.08] transition-shadow duration-300 hover:shadow-[0_10px_36px_-12px_rgba(30,58,95,0.2)] md:p-7 lg:order-2 lg:p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A5F]/[0.12] text-[#1E3A5F] lg:mb-4 lg:h-11 lg:w-11">
                <i className="ri-phone-line text-lg lg:text-xl" aria-hidden />
              </div>
              <h2 className="mb-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] lg:mb-2">Call Kelly</h2>
              <p
                className="text-lg font-semibold text-[#2D2D2D] select-text cursor-text"
                translate="no"
                title="Dial this number from your phone"
              >
                {PHONE_DISPLAY}
              </p>
              <p className="mt-3 text-sm font-medium leading-snug text-[#4a4a4a] lg:mt-3.5">Most people start here.</p>
            </div>

            {/* Form */}
            <div className="order-3 flex min-w-0 flex-col rounded-2xl border border-[#E4E1DA] bg-white p-6 shadow-[0_2px_20px_-10px_rgba(30,58,95,0.08)] md:p-7 lg:order-3 lg:p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A5F]/[0.08] text-[#1E3A5F] lg:mb-4 lg:h-11 lg:w-11">
                <i className="ri-chat-3-line text-lg lg:text-xl" aria-hidden />
              </div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] lg:mb-3">Send a message</h2>
              <p className="mb-4 font-['Inter'] text-sm leading-snug text-[#5c574e] lg:mb-5">Include your phone number so I can follow up if needed.</p>
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="flex scroll-mt-24 flex-col gap-3.5 lg:gap-4"
              >
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
                <div className="min-h-[100px] lg:min-h-[108px]">
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
                    className="w-full min-h-[100px] resize-y rounded-xl border border-[#E0DED8] bg-[#FAFAF8]/80 px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-gray-400 outline-none transition-shadow focus:border-[#1E3A5F]/40 focus:ring-2 focus:ring-[#1E3A5F]/15 lg:min-h-[108px]"
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

          <p className="mx-auto mt-10 max-w-2xl px-1 text-center text-sm leading-relaxed text-pretty text-[#555] sm:px-0 md:mt-12 md:text-base lg:mt-10">
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
