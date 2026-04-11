import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=serene%20modern%20classroom%20library%20with%20warm%20natural%20light%20streaming%20through%20large%20windows%20soft%20neutral%20tones%20beige%20cream%20white%20walls%20wooden%20shelves%20with%20books%20clean%20minimalist%20educational%20space%20no%20people%20calm%20professional%20atmosphere%20wide%20angle&width=1440&height=900&seq=hero001&orientation=landscape"
          alt="Educational environment"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/85 via-[#1E3A5F]/60 to-[#1E3A5F]/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
            Education Specialist · Special Education
          </p>
          <h1 className="font-['Crimson_Pro'] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Kelly Peterson
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-4 font-['Inter']">
            Education Specialist (Special Education)
          </p>
          <p className="text-base md:text-lg text-white/75 leading-relaxed mb-10 max-w-xl font-['Inter'] font-light">
            26+ years TK–8. Inclusion · RSP · SDC. IEP-aligned instruction, MTSS/UDL supports, and trust-centered mentorship that changes outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/resume"
              className="px-8 py-4 bg-white text-[#1E3A5F] rounded-full text-sm font-semibold hover:bg-white/90 transition-all duration-200 text-center whitespace-nowrap cursor-pointer"
            >
              Download Resume
            </Link>
            <Link
              to="/impact-stories"
              className="px-8 py-4 border-2 border-white text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-all duration-200 text-center whitespace-nowrap cursor-pointer"
            >
              View Impact Stories
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-white/40"></div>
        <i className="ri-arrow-down-line text-white/50 text-sm"></i>
      </div>
    </section>
  );
}
