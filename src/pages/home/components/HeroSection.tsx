import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BG_IMAGES = [
  `${import.meta.env.BASE_URL}kelly-bg-1.png`,
  `${import.meta.env.BASE_URL}kelly-bg-2.png`,
  `${import.meta.env.BASE_URL}kelly-bg-3.png`,
  `${import.meta.env.BASE_URL}kelly-bg-4.png`,
  `${import.meta.env.BASE_URL}kelly-bg-5.png`,
  `${import.meta.env.BASE_URL}kelly-bg-6.png`,
] as const;

/** Time each slide stays fully (or mostly) visible before crossfading to the next. */
const SLIDE_INTERVAL_MS = 5500;
/** Crossfade duration — keep subtle (CSS transition matches). */
const FADE_MS = 1800;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % BG_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Rotating background slideshow */}
      <div className="absolute inset-0 z-0">
        {BG_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity ease-in-out pointer-events-none"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
            }}
            aria-hidden
          >
            <img
              src={src}
              alt=""
              className="w-full h-full min-h-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
        {/* Readability: soft dark wash + existing brand gradient */}
        <div
          className="absolute inset-0 z-[2] bg-black/25 bg-gradient-to-r from-[#1E3A5F]/80 via-[#1E3A5F]/55 to-[#1E3A5F]/25 pointer-events-none"
          aria-hidden
        />
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
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Kelly_Peterson_resume.pdf"
              className="px-8 py-4 bg-white text-[#1E3A5F] rounded-full text-sm font-semibold hover:bg-white/90 transition-all duration-200 text-center whitespace-nowrap cursor-pointer"
            >
              Download Resume
            </a>
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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-white/40"></div>
        <i className="ri-arrow-down-line text-white/50 text-sm"></i>
      </div>
    </section>
  );
}
