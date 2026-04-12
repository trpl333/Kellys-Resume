import resume from "@data/kelly_resume_source.json";

type Edu = { degree: string; school: string; location: string; date: string };
type Cred = { name: string; date: string };

const education = resume.education as Edu[];
const credentials = resume.certifications as Cred[];

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

      <h2 className="font-['Crimson_Pro'] text-3xl font-bold text-[#1E3A5F] mb-12 pb-4 border-b border-[#E8E8E6]">
        Credentials &amp; Certifications
      </h2>

      <div className="flex flex-col gap-4">
        {credentials.map((cred, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 border-b border-[#E8E8E6] last:border-0"
          >
            <p className="text-sm text-[#3D3D3D] font-['Inter']">{cred.name}</p>
            <p className="text-sm font-medium text-[#1E3A5F] whitespace-nowrap font-['Inter']">
              {cred.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
