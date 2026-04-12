import resume from "@data/kelly_resume_source.json";

const bullets = resume.signature_impact as string[];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="mt-2 w-2 h-2 rounded-full bg-[#1E3A5F] flex-shrink-0"></div>
              <p className="min-w-0 text-base text-[#3D3D3D] leading-relaxed font-['Inter'] text-pretty">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
