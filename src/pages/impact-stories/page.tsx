import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import StoryCard from "./components/StoryCard";
import resume from "@data/kelly_resume_source.json";

type StarWeb = {
  situation: string;
  task: string;
  action: string;
  result: string;
};

type ImpactStory = {
  id: string;
  title: string;
  district: string;
  site: string;
  star_web: StarWeb;
};

const impactList = resume.impact_stories as ImpactStory[];
const storyOrder = ["mission-hills-literacy", "chino-partnership"];
const sortedStories = [...impactList].sort(
  (a, b) => storyOrder.indexOf(a.id) - storyOrder.indexOf(b.id),
);

/** One-line transformation hooks (compressed from each story’s result). */
const IMPACT_HOOKS: Record<string, string> = {
  "mission-hills-literacy":
    "A student who wouldn't touch books—chose high-school novel electives and said this chapter was the turning point.",
  "chino-partnership":
    "Two students written off as behavior concerns—families came back to school life, engagement held, both later called those years formative.",
};

function combineWhatKellyDid(task: string, action: string): string {
  const t = task.trim();
  const a = action.trim();
  if (!t) return a;
  if (!a) return t;
  return `${t} ${a}`;
}

const stories = sortedStories.map((s) => ({
  tag: `${s.district} · ${s.site}`,
  title: s.title,
  hook: IMPACT_HOOKS[s.id] ?? "",
  situation: s.star_web.situation,
  whatKellyDid: combineWhatKellyDid(s.star_web.task, s.star_web.action),
  result: s.star_web.result,
}));

const FEATURE_CHIPS = [
  "Rebuilt literacy confidence",
  "Restored family trust",
  "Sustained student engagement",
] as const;

export default function ImpactStoriesPage() {
  return (
    <div className="min-h-screen font-['Inter']">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#EEEDE9] to-[#FAFAF8] pt-32 pb-14 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">
            Student outcomes
          </p>
          <h1 className="font-['Crimson_Pro'] text-5xl md:text-6xl font-bold text-[#2D2D2D] mb-5 leading-tight">
            Impact Stories
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed font-['Inter'] font-medium">
            Real classroom moments. Real student change. Privacy always respected.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-2.5 md:gap-3">
            {FEATURE_CHIPS.map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-[#1E3A5F]/15 bg-white/80 px-4 py-2 text-xs md:text-sm font-medium text-[#1E3A5F] shadow-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="bg-[#FAFAF8] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col gap-10 md:gap-12">
          {stories.map((story, i) => (
            <StoryCard key={i} {...story} />
          ))}
        </div>
      </section>

      {/* Bottom note */}
      <section className="bg-white py-12 border-t border-[#E8E0D0]/60">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <p className="text-sm text-gray-500 font-['Inter'] leading-relaxed">
            No fabricated metrics. Stories use portfolio-aligned, privacy-safe language—no names or disability labels.
          </p>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="bg-[#1E3A5F] py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-['Crimson_Pro'] text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
            Want to bring this kind of impact to your school or program?
          </h2>
          <p className="text-sm md:text-base text-white/80 font-['Inter'] leading-relaxed mb-8">
            If you’re hiring for special education leadership, field supervision, or partnership on inclusion and IEP quality, Kelly would welcome a conversation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#1E3A5F] shadow-md transition-colors hover:bg-white/95 cursor-pointer"
          >
            Contact Kelly
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
