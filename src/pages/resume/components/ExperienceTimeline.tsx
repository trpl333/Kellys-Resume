const experiences = [
  {
    dates: "Aug 2017 – Present",
    title: "Education Specialist (SDC + RSP/Inclusion)",
    org: "Oakland Unified School District — Olive Elementary",
    bullets: [
      "Deliver specialized academic instruction in both SDC and RSP/Inclusion settings for students with mild-to-moderate disabilities (TK–8)",
      "Develop, implement, and monitor Individualized Education Programs (IEPs) in compliance with IDEA and California Education Code",
      "Collaborate with general education teachers, related service providers, and families to design and execute MTSS and UDL-aligned supports",
      "Lead IEP meetings, facilitate goal-setting, and maintain legally compliant documentation and progress monitoring",
      "Provide behavioral support strategies and co-teaching models to promote inclusive classroom participation",
    ],
  },
  {
    dates: "Aug 2020 – Present",
    title: "Field Supervisor — SPED & Multiple Subject",
    org: "Chapman University (Caseload / As-Needed)",
    bullets: [
      "Observe and formally evaluate credential candidates in K–12 classroom placements across SPED and Multiple Subject programs",
      "Conduct pre- and post-observation conferences aligned to the 13 California Teaching Performance Expectations (TPEs)",
      "Support candidates through the CalTPA (California Teaching Performance Assessment) process with formative coaching",
      "Provide program-level approval and non-approval readiness recommendations to the university",
      "Serve as a bridge between university standards and real-world classroom practice",
    ],
  },
  {
    dates: "Mar 2016 – Jun 2017",
    title: "SPED Instructional Aide",
    org: "Saddleback Valley Unified School District",
    bullets: [
      "Supported students with disabilities in inclusive and pull-out settings under the direction of the Education Specialist",
      "Implemented IEP goals and behavior support plans with fidelity",
      "Assisted with data collection, progress monitoring, and classroom management",
    ],
  },
  {
    dates: "Jun 2013 – Mar 2016",
    title: "Volunteer — Classroom & SPED Support",
    org: "Riley Elementary, Capistrano Unified School District",
    bullets: [
      "Designed and led a 5th grade Revolutionary War walk-through experiential learning program",
      "Conducted weekly reading assessments for 5th grade students",
      "Supported SPED department with reading assessments and instructional materials",
    ],
  },
  {
    dates: "Jun 2008 – Jun 2013",
    title: "Junior High English Teacher",
    org: "Mission Hills Christian School",
    bullets: [
      "Taught English Language Arts to junior high students in a private school setting",
      "Developed curriculum, managed classroom instruction, and supported diverse learners",
      "Maintained strong family communication and student-centered classroom culture",
    ],
  },
  {
    dates: "Aug 1994 – Jun 2008",
    title: "Elementary Teacher",
    org: "Chino Unified School District — Anna Borba Elementary",
    bullets: [
      "Taught multiple grade levels across a 14-year tenure in a high-need public school district",
      "Served as Master Teacher for 5th grade and Grade Level Coordinator",
      "Participated in RTI committees, district curriculum adoption, School Site Council, and Science Fair coordination",
      "Mentored student teachers and supported professional development initiatives",
    ],
  },
  {
    dates: "Oct 1991 – Aug 1994",
    title: "6th Grade Teacher",
    org: "Glenmeade Elementary",
    bullets: [
      "Delivered full-day instruction across core subjects for 6th grade students",
      "Built foundational classroom management and differentiated instruction skills",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="mb-20">
      <h2 className="font-['Crimson_Pro'] text-3xl font-bold text-[#1E3A5F] mb-12 pb-4 border-b border-[#E8E8E6]">
        Professional Experience
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[140px] top-0 bottom-0 w-px bg-[#E8E8E6] hidden md:block"></div>

        <div className="flex flex-col gap-12">
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
                <ul className="flex flex-col gap-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1E3A5F]/40 flex-shrink-0"></div>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed font-['Inter']">{b}</p>
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
