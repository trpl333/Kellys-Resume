import { Link } from "react-router-dom";
import { resumeFullPdfHref, resumeQuickPdfHref } from "@/lib/resumePdfHref";

export default function Footer() {
  return (
    <footer className="bg-[#F5F0E8] border-t border-[#E8E0D0]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <img
              src="https://public.readdy.ai/ai/img_res/0a57e3ec-0a4c-4479-9919-2c7efa0c2611.png"
              alt="Kelly Peterson Logo"
              className="h-10 w-auto object-contain"
            />
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Education Specialist (Special Education) · 26+ years TK–8 · Mission Viejo, CA
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1E3A5F]">Pages</p>
              <Link to="/" className="text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors cursor-pointer">Home</Link>
              <Link to="/resume" className="text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors cursor-pointer">Resume</Link>
              <Link to="/impact-stories" className="text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors cursor-pointer">Impact Stories</Link>
              <Link
                to={{ pathname: "/", hash: "leadership" }}
                className="text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors cursor-pointer"
              >
                Leadership
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1E3A5F]">Connect</p>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors cursor-pointer">Contact</Link>
              <a href="mailto:kellykaypeterson@gmail.com" className="text-sm text-gray-500 hover:text-[#1E3A5F] transition-colors cursor-pointer">
                kellykaypeterson@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8E0D0] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Kelly Peterson. Resume and portfolio available upon request.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
            <a
              href={resumeQuickPdfHref()}
              download="Kelly_Peterson_Quick_Resume.pdf"
              className="text-[#1E3A5F] font-semibold hover:underline cursor-pointer"
            >
              Quick Resume (2 Pages) →
            </a>
            <a
              href={resumeFullPdfHref()}
              download="Kelly_Peterson_Full_Professional_History.pdf"
              className="text-gray-500 hover:text-[#1E3A5F] hover:underline cursor-pointer"
            >
              Full Professional History →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
