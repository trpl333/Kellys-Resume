import { Link } from "react-router-dom";

const stories = [
  {
    tag: "Literacy & Confidence",
    title: "Reluctant Reader to Confident Learner",
    summary:
      "A student arrived with deep reluctance around reading — avoidance behaviors, low stamina, and visible anxiety around text. Over two years, Kelly built a structured, low-pressure reading environment grounded in student interest and incremental success. By the end of the second year, the student's confidence had measurably shifted. Years later, that same student chose novel-study electives — and credited Kelly's approach as the turning point.",
    link: "/impact-stories",
  },
  {
    tag: "Mentorship & Trust",
    title: "Trust Built with High-Needs Learners",
    summary:
      "Two cousins, both high-risk, arrived with significant barriers to engagement — academic, social, and basic-needs related. Kelly built trust through consistent presence, honest communication, and practical support that extended beyond the classroom. The mentorship relationship created stability that neither student had experienced before. Years later, both cousins showed long-term positive outcomes — a testament to what sustained, relationship-first support can accomplish.",
    link: "/impact-stories",
  },
];

export default function ImpactPreview() {
  return (
    <section className="bg-[#FAFAF8] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">
              Student Outcomes
            </p>
            <h2 className="font-['Crimson_Pro'] text-4xl md:text-5xl font-bold text-[#2D2D2D]">
              Impact Stories
            </h2>
            <p className="text-sm text-gray-400 mt-3 font-['Inter']">
              Privacy-safe summaries. Details shared with respect for student privacy.
            </p>
          </div>
          <Link
            to="/impact-stories"
            className="text-sm font-medium text-[#1E3A5F] hover:underline whitespace-nowrap cursor-pointer"
          >
            View all stories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-[#EEEDE9] rounded-2xl p-8 md:p-10 flex flex-col hover:scale-[1.01] transition-transform duration-300 cursor-default"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1E3A5F] mb-4">
                {story.tag}
              </p>
              <h3 className="font-['Crimson_Pro'] text-2xl font-bold text-[#2D2D2D] mb-5">
                {story.title}
              </h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed font-['Inter'] flex-1">
                {story.summary}
              </p>
              <Link
                to={story.link}
                className="mt-8 text-sm font-medium text-[#1E3A5F] hover:underline cursor-pointer"
              >
                Read full story →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
