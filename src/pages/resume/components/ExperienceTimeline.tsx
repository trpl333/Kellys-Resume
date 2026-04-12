import resume from "@data/kelly_resume_source.json";

type Role = {
  employer: string;
  school_site?: string;
  location?: string;
  title: string;
  start: string;
  end: string;
  employment_note?: string;
  bullets: string[];
};

const roles = resume.experience as Role[];

const experiences = roles.map((role) => {
  let org = role.employer;
  if (role.school_site) {
    org = `${role.employer} · ${role.school_site}`;
  }
  if (role.employment_note) {
    org += ` (${role.employment_note})`;
  }
  return {
    dates: `${role.start} – ${role.end}`,
    title: role.title,
    org,
    bullets: role.bullets,
  };
});

export default function ExperienceTimeline() {
  return (
    <div className="mb-20">
      <h2 className="font-['Crimson_Pro'] text-3xl font-bold text-[#1E3A5F] mb-12 pb-4 border-b border-[#E8E8E6]">
        Professional Experience
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[140px] top-0 bottom-0 w-px bg-[#E8E8E6] hidden md:block"></div>

        <div className="flex flex-col gap-14">
          {experiences.map((exp, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-0">
              {/* Date */}
              <div className="md:w-[140px] md:pr-8 flex-shrink-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1E3A5F] md:text-right leading-relaxed">
                  {exp.dates}
                </p>
              </div>

              {/* Node */}
              <div className="hidden md:flex items-start justify-center w-6 flex-shrink-0 relative">
                <div className="w-3 h-3 rounded-full bg-[#1E3A5F] mt-1 relative z-10"></div>
              </div>

              {/* Content */}
              <div className="md:pl-8 flex-1">
                <h3 className="text-lg font-semibold text-[#2D2D2D] font-['Inter'] mb-1">
                  {exp.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-['Inter']">{exp.org}</p>
                <ul className="flex flex-col gap-2.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1E3A5F]/40 flex-shrink-0"></div>
                      <p className="min-w-0 text-sm text-[#4A4A4A] leading-relaxed font-['Inter'] text-pretty">{b}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
