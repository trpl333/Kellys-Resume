import { Link } from "react-router-dom";

export default function LeadershipPreview() {
  return (
    <section id="leadership" className="scroll-mt-28 bg-[#1E3A5F] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-6">
          Beyond the Classroom
        </p>
        <h2 className="font-['Crimson_Pro'] text-4xl md:text-5xl font-bold text-white mb-8">
          Leadership &amp; Mentorship
        </h2>
        <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-3xl mx-auto mb-12 font-['Inter'] font-light">
          As a Chapman University Field Supervisor since 2020, Kelly observes, coaches, and formally evaluates credential candidates — providing formative and summative assessments aligned to all 13 Teaching Performance Expectations (TPEs) and the CalTPA. She delivers program-level approval and non-approval readiness recommendations, directly shaping the next generation of educators. Her committee work spans RTI, SELPA behavior teams, district curriculum adoption, School Site Council, and Science Fair coordination.
        </p>
        <Link
          to={{ pathname: "/", hash: "leadership" }}
          className="inline-flex min-h-11 items-center justify-center px-8 py-3.5 border-2 border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-[#1E3A5F] transition-all duration-200 text-center cursor-pointer"
        >
          View Leadership Experience
        </Link>
      </div>
    </section>
  );
}
