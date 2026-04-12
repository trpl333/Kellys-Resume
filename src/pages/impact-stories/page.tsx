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

const stories = sortedStories.map((s) => ({
  tag: `${s.district} · ${s.site}`,
  title: s.title,
  situation: s.star_web.situation,
  task: s.star_web.task,
  action: s.star_web.action,
  result: s.star_web.result,
}));

export default function ImpactStoriesPage() {
  return (
    <div className="min-h-screen font-['Inter']">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#EEEDE9] pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">
            Student Outcomes
          </p>
          <h1 className="font-['Crimson_Pro'] text-5xl md:text-6xl font-bold text-[#2D2D2D] mb-6">
            Impact Stories
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed font-['Inter']">
            STAR summaries from the same source as the resume JSON. No student names, disability identifiers, or
            confidential details.
          </p>
        </div>
      </section>

      {/* Privacy Note */}
      <div className="bg-[#1E3A5F]/5 border-b border-[#1E3A5F]/10 py-4">
        <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center gap-3">
          <i className="ri-shield-check-line text-[#1E3A5F] text-base"></i>
          <p className="text-sm text-[#1E3A5F] font-['Inter']">
            Content is synced to <code className="rounded bg-white/60 px-1">data/kelly_resume_source.json</code>.
          </p>
        </div>
      </div>

      {/* Stories */}
      <section className="bg-[#FAFAF8] py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col gap-12">
          {stories.map((story, i) => (
            <StoryCard key={i} {...story} />
          ))}
        </div>
      </section>

      {/* Bottom note */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <p className="text-sm italic text-gray-400 font-['Inter']">
            No fabricated metrics; wording follows portfolio-aligned, privacy-safe summaries.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
