const bullets = [
  "26+ years TK–8 teaching experience across public and private schools",
  "OUSD Education Specialist (SDC + RSP/Inclusion) since August 2017 — present",
  "Chapman University Field Supervisor (Aug 2020–Present): coaches and evaluates credential candidates, supports CalTPA aligned to the 13 TPEs, and provides program-level approval/non-approval readiness recommendations",
  "Riley Elementary (CUSD) volunteer: led 5th grade Revolutionary War walk-through program, conducted weekly reading assessments for 5th grade, and supported SPED department reading assessments",
  "Reluctant reader transformed over two years of confidence-rebuilding — student later chose novel-study electives and credited Kelly's approach",
  "High-risk mentorship with two cousins: trust-centered support and basic-needs advocacy led to long-term positive outcomes years later",
  "Expertise in IEP development, MTSS frameworks, and UDL instructional design across mild-to-moderate disability profiles",
  "Credentialed in Ed Specialist (Mild/Moderate), Multiple Subject, CLAD, and IB PYP — a rare breadth of qualification",
];

export default function SignatureImpact() {
  return (
    <section className="bg-[#EEEDE9] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">
            By the Numbers & Beyond
          </p>
          <h2 className="font-['Crimson_Pro'] text-4xl md:text-5xl font-bold text-[#2D2D2D]">
            Signature Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="mt-2 w-2 h-2 rounded-full bg-[#1E3A5F] flex-shrink-0"></div>
              <p className="text-base text-[#3D3D3D] leading-relaxed font-['Inter']">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
