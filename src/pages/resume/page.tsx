import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ExperienceTimeline from "./components/ExperienceTimeline";
import EducationBlock from "./components/EducationBlock";

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
          <p className="text-base text-white/65 font-['Inter']">
            26+ years TK–8 Special Education · Inclusion · RSP · SDC
          </p>
        </div>
      </section>

      {/* Resume Content */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          {/* Download Button */}
          <div className="flex justify-end mb-12">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Kelly_Peterson_resume.pdf"
              className="flex items-center gap-2 px-6 py-3 border border-[#1E3A5F] text-[#1E3A5F] rounded-full text-sm font-medium hover:bg-[#1E3A5F] hover:text-white transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-download-line"></i>
              Download PDF Resume
            </a>
          </div>

          {/* Summary */}
          <div className="mb-16 p-8 bg-[#FAFAF8] rounded-2xl border border-[#E8E8E6]">
            <h2 className="font-['Crimson_Pro'] text-2xl font-bold text-[#1E3A5F] mb-4">
              Kelly Peterson
            </h2>
            <p className="text-sm text-gray-500 mb-1">Education Specialist (Special Education)</p>
            <p className="text-sm text-gray-500 mb-6">Mission Viejo, CA · kellykaypeterson@gmail.com</p>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              Education Specialist with 26+ years of TK–8 experience across public and private schools. Expertise in Inclusion, RSP, and SDC delivery models. Skilled in IEP development, MTSS frameworks, UDL instructional design, and CalTPA-aligned credential supervision. Currently serving as Education Specialist at Orange Unified School District (Olive Elementary) and Field Supervisor at Chapman University.
            </p>
          </div>

          <ExperienceTimeline />
          <EducationBlock />

          {/* Bottom Download */}
          <div className="text-center pt-8 border-t border-[#E8E8E6]">
            <p className="text-sm text-gray-400 mb-6 font-['Inter']">
              Full resume and references available upon request.
            </p>
            <a
              href="mailto:kellykaypeterson@gmail.com?subject=Resume Request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E3A5F] text-white rounded-full text-sm font-semibold hover:bg-[#162d4a] transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-mail-line"></i>
              Request Full Resume
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
