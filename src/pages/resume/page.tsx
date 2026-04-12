import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ExperienceTimeline from "./components/ExperienceTimeline";
import EducationBlock from "./components/EducationBlock";
import { resumeFullPdfHref, resumeQuickPdfHref } from "@/lib/resumePdfHref";
import resume from "@data/kelly_resume_source.json";

const summaryParagraphs = resume.summary as string[];
const contact = resume.contact as { city_state_zip: string; phone: string; email: string };

export default function ResumePage() {
  return (
    <div className="min-h-screen font-['Inter']">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-[#1E3A5F] pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
            Professional Background
          </p>
          <h1 className="font-['Crimson_Pro'] text-5xl md:text-6xl font-bold text-white mb-4">
            Resume
          </h1>
          <p className="text-base text-white/65 font-['Inter'] text-pretty max-w-2xl mx-auto">
            26+ years TK–8 special education in inclusion, Special Day Class (SDC), and Resource Specialist Program (RSP)
          </p>
        </div>
      </section>

      {/* Resume Content */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          {/* Download options */}
          <div className="mb-14 rounded-2xl border border-[#E8E8E6] bg-[#FAFAF8] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]/75 mb-6">Download Options</p>
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
              <div className="flex-1 min-w-0">
                <a
                  href={resumeQuickPdfHref()}
                  download="Kelly_Peterson_Quick_Resume.pdf"
                  className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#1E3A5F] text-white hover:bg-[#162d4a] transition-all duration-200 cursor-pointer"
                >
                  <i className="ri-download-line" aria-hidden />
                  Quick Resume (2 Pages)
                </a>
                <p className="mt-2 text-xs text-gray-500 font-['Inter'] leading-relaxed">Best for initial review</p>
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={resumeFullPdfHref()}
                  download="Kelly_Peterson_Full_Professional_History.pdf"
                  className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <i className="ri-download-line" aria-hidden />
                  Full Professional History
                </a>
                <p className="mt-2 text-xs text-gray-500 font-['Inter'] leading-relaxed">Complete experience and background</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-16 p-8 bg-[#FAFAF8] rounded-2xl border border-[#E8E8E6]">
            <h2 className="font-['Crimson_Pro'] text-2xl font-bold text-[#1E3A5F] mb-4">
              Kelly Peterson
            </h2>
            <p className="text-sm text-gray-500 mb-1">Education Specialist (Special Education)</p>
            <p className="text-sm text-gray-500 mb-6">
              {contact.city_state_zip} | {contact.phone} | {contact.email}
            </p>
            {summaryParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-sm text-[#4A4A4A] leading-relaxed ${i < summaryParagraphs.length - 1 ? "mb-4" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ExperienceTimeline />
          <EducationBlock />

          {/* Bottom Download */}
          <div className="text-center pt-8 border-t border-[#E8E8E6]">
            <p className="text-sm text-gray-400 mb-6 font-['Inter']">
              Full resume and references available upon request.
            </p>
            <Link
              to="/contact#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E3A5F] text-white rounded-full text-sm font-semibold hover:bg-[#162d4a] transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-mail-line"></i>
              Request full resume
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
