import { Link } from "react-router-dom";

const stories = [
  {
    tag: "Literacy & confidence",
    title: "Reluctant reader to engaged learner",
    summary:
      "Two years of low-pressure, interest-led work; avoidance eased into steady reading. Later chose high-school novel electives and named this stretch the turning point.",
    link: "/impact-stories",
  },
  {
    tag: "Trust & partnership",
    title: "Students and families re-engaged",
    summary:
      "Two high-needs students: daily check-ins, clear expectations, and honest follow-through. Families came back to school events; both later described the steady support as formative.",
    link: "/impact-stories",
  },
];

export default function ImpactPreview() {
  return (
    <section className="bg-[#FAFAF8] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">
              Student outcomes
            </p>
            <h2 className="font-['Crimson_Pro'] text-4xl md:text-5xl font-bold text-[#2D2D2D]">
              Impact Stories
            </h2>
            <p className="text-sm text-gray-500 mt-3 font-['Inter'] max-w-md">
              Privacy-safe snapshots with no names or labels. Read the full narratives on Impact Stories.
            </p>
          </div>
          <Link
            to="/impact-stories"
            className="text-sm font-semibold text-[#1E3A5F] hover:text-[#162d4a] transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-1"
          >
            View all stories
            <span aria-hidden className="text-[#1E3A5F]/70">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {stories.map((story, i) => (
            <article
              key={i}
              className="relative flex flex-col rounded-2xl border border-[#E8E0D0]/90 bg-white p-7 md:p-8 shadow-[0_2px_16px_-4px_rgba(30,58,95,0.08)] transition-all duration-300 hover:border-[#1E3A5F]/20 hover:shadow-[0_12px_32px_-12px_rgba(30,58,95,0.14)]"
            >
              <span className="inline-flex w-fit rounded-full bg-[#1E3A5F]/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1E3A5F] mb-4">
                {story.tag}
              </span>
              <h3 className="font-['Crimson_Pro'] text-xl md:text-2xl font-bold text-[#2D2D2D] mb-3 leading-snug">
                {story.title}
              </h3>
              <p className="text-sm text-[#555] leading-relaxed font-['Inter'] flex-1 line-clamp-4 md:line-clamp-5">
                {story.summary}
              </p>
              <Link
                to={story.link}
                className="mt-6 inline-flex min-h-10 items-center gap-1.5 py-1 text-sm font-semibold text-[#1E3A5F] hover:text-[#162d4a] transition-colors cursor-pointer"
              >
                Read full story
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
