import { FormEvent, useState } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";

const CONTACT_EMAIL = "kellykaypeterson@gmail.com";
const PHONE_DISPLAY = "949.556.5378";
const PHONE_TEL = "+19495565378";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = [`From: ${name || "(no name)"}`, `Reply-to: ${email || "(no email)"}`, "", message || "(no message)"].join(
      "\n",
    );
    const subject = encodeURIComponent("Message from Kelly Peterson website");
    const mail = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mail;
  }

  return (
    <div className="min-h-screen font-['Inter'] bg-[#FAFAF8]">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#FAFAF8] pt-32 pb-16 md:pb-20 border-b border-[#E8E0D0]/50">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">Get in Touch</p>
          <h1 className="font-['Crimson_Pro'] text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#2D2D2D] mb-6 leading-tight">
            Let&apos;s talk about how I can support your students
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed font-['Inter']">
            Whether you&apos;re looking for classroom support, collaboration, or guidance, I&apos;m always open to connecting.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Email */}
            <div className="flex flex-col rounded-2xl border border-[#E4E1DA] bg-white p-8 md:p-9 shadow-[0_2px_20px_-10px_rgba(30,58,95,0.08)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1E3A5F]/[0.08] text-[#1E3A5F]">
                <i className="ri-mail-line text-xl" aria-hidden />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] mb-2">Email</h2>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-lg font-semibold text-[#2D2D2D] hover:text-[#1E3A5F] transition-colors break-all"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">Best for detailed questions or collaboration</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col rounded-2xl border border-[#E4E1DA] bg-white p-8 md:p-9 shadow-[0_2px_20px_-10px_rgba(30,58,95,0.08)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1E3A5F]/[0.08] text-[#1E3A5F]">
                <i className="ri-phone-line text-xl" aria-hidden />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] mb-2">Call or Text</h2>
              <a href={`tel:${PHONE_TEL}`} className="text-lg font-semibold text-[#2D2D2D] hover:text-[#1E3A5F] transition-colors">
                {PHONE_DISPLAY}
              </a>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">Happy to connect directly</p>
            </div>

            {/* Form */}
            <div className="flex flex-col rounded-2xl border border-[#E4E1DA] bg-white p-8 md:p-9 shadow-[0_2px_20px_-10px_rgba(30,58,95,0.08)] lg:row-span-1">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1E3A5F]/[0.08] text-[#1E3A5F]">
                <i className="ri-chat-3-line text-xl" aria-hidden />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] mb-5">Quick Message</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    autoComplete="name"
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
                    placeholder="Your email"
                    autoComplete="email"
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
                    placeholder="Message"
                    rows={4}
                    className="w-full min-h-[120px] resize-y rounded-xl border border-[#E0DED8] bg-[#FAFAF8]/80 px-4 py-3 text-sm text-[#2D2D2D] placeholder:text-gray-400 outline-none transition-shadow focus:border-[#1E3A5F]/40 focus:ring-2 focus:ring-[#1E3A5F]/15"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-[#1E3A5F] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#162d4a] cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <p className="mt-14 md:mt-16 max-w-2xl mx-auto text-center text-sm md:text-base text-[#555] leading-relaxed">
            Every message is handled personally. I value thoughtful, respectful communication and will respond as soon as
            possible.
          </p>

          <p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
            Based in Mission Viejo, CA
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
