import resume from "@data/kelly_resume_source.json";

type Edu = { degree: string; school: string; location: string; date: string };
type Cred = { name: string; date: string };

const education = resume.education as Edu[];
const credentials = resume.certifications as Cred[];

function isCaliforniaClearCredential(cred: Cred): boolean {
  return (
    cred.name.startsWith("Clear Education Specialist") ||
    cred.name.startsWith("Clear Multiple Subject")
  );
}

export default function EducationBlock() {
  return (
    <div className="mb-20">
      <h2 className="font-['Crimson_Pro'] text-3xl font-bold text-[#1E3A5F] mb-12 pb-4 border-b border-[#E8E8E6]">
        Education
      </h2>

      <div className="bg-[#EEEDE9] rounded-2xl p-8 md:p-10 mb-14">
        <div className="flex flex-col gap-8">
          {education.map((edu, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <p className="text-base font-semibold text-[#2D2D2D] font-['Inter']">{edu.degree}</p>
                <p className="text-sm text-gray-500 font-['Inter']">
                  {edu.school} · {edu.location}
                </p>
              </div>
              <p className="text-sm font-medium text-[#1E3A5F] whitespace-nowrap font-['Inter']">
                {edu.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="font-['Crimson_Pro'] text-xl md:text-2xl font-semibold text-[#1E3A5F] leading-snug mb-4 max-w-3xl">
        Fully Credentialed Across Special Education and General Education
      </p>

      <h2 className="font-['Crimson_Pro'] text-3xl font-bold text-[#1E3A5F] mb-3 pb-4 border-b border-[#E8E8E6]">
        Certifications &amp; Credentials
      </h2>

      <p className="text-sm text-gray-600 font-['Inter'] leading-relaxed mb-10 max-w-2xl">
        Fully cleared in both Special Education and General Education in California
      </p>

      <ul className="list-none space-y-8">
        {credentials.map((cred, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed font-['Inter'] text-[#3D3D3D]">
            <span className="mt-0.5 shrink-0 font-semibold text-[#1E3A5F]" aria-hidden>
              •
            </span>
            <div className="min-w-0 flex flex-col gap-1.5">
              {isCaliforniaClearCredential(cred) ? (
                <span className="text-xs font-medium text-[#1E3A5F]/75 tracking-wide">
                  Clear Credential (California)
                </span>
              ) : null}
              <p className="m-0">
                <span className="font-medium text-[#2D2D2D]">{cred.name}</span>
                <span className="text-gray-600"> — {cred.date}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
