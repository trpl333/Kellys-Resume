import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="bg-white py-28 md:py-36">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <h2 className="font-['Crimson_Pro'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A5F] leading-tight mb-10 text-balance">
          Let&apos;s talk about supporting students and strengthening your team.
        </h2>
        <Link
          to="/contact"
          className="inline-flex min-h-12 items-center justify-center px-10 py-4 sm:py-5 bg-[#1E3A5F] text-white rounded-full text-sm font-semibold hover:bg-[#162d4a] transition-all duration-200 text-center cursor-pointer shadow-md"
        >
          Contact Kelly
        </Link>
        <p className="mt-6 text-sm text-gray-400 font-['Inter']">
          Mission Viejo, CA | 949-556-5378 | kellykaypeterson@gmail.com
        </p>
      </div>
    </section>
  );
}
