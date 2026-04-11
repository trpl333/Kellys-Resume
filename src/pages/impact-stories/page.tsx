import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import StoryCard from "./components/StoryCard";

const stories = [
  {
    tag: "Literacy & Confidence",
    title: "Reluctant Reader to Confident Learner",
    situation:
      "A student arrived with deep reluctance around reading — avoidance behaviors, low stamina, and visible anxiety whenever text was introduced. Prior interventions had focused heavily on decoding drills, which had eroded the student's confidence rather than building it.",
    task:
      "Kelly needed to rebuild this student's relationship with reading from the ground up — addressing both the skill gaps and the emotional barriers that had accumulated over years of struggle.",
    action:
      "Over two years, Kelly designed a low-pressure, interest-driven reading environment. She selected texts aligned to the student's genuine interests, used incremental success checkpoints to build stamina, and consistently reframed reading as exploration rather than performance. She maintained close communication with the family and coordinated with the general education teacher to ensure consistency across settings.",
    result:
      "By the end of the second year, the student's confidence had measurably shifted — both in observable behavior and in self-reported attitude toward reading. Years later, that same student chose novel-study electives and credited Kelly's approach as the turning point in their relationship with books.",
    demonstrates: [
      "Long-view instructional thinking: willingness to prioritize confidence-building over short-term metric gains",
      "Skill in diagnosing and addressing the emotional dimensions of learning differences",
      "Ability to sustain meaningful progress over multi-year relationships with students",
    ],
  },
  {
    tag: "Mentorship & Trust",
    title: "Trust Built with High-Needs Learners",
    situation:
      "Two cousins, both high-risk, arrived with significant barriers to engagement — academic, social, and basic-needs related. Both had histories of inconsistent adult support and were resistant to school-based relationships.",
    task:
      "Kelly's task was not simply instructional — it was relational. Before any academic progress could happen, trust had to be established with students who had learned not to trust the adults around them.",
    action:
      "Kelly showed up consistently, kept her word, and extended support beyond the classroom when basic needs were unmet. She communicated honestly with both students, advocated for resources, and maintained a steady, non-judgmental presence over an extended period. She also worked to coordinate with family members and community supports to create a wider net of stability.",
    result:
      "The mentorship relationship created a foundation of stability that neither student had previously experienced in a school setting. Both cousins showed long-term positive outcomes years after their time with Kelly — a result that speaks to the durability of trust-centered, relationship-first support.",
    demonstrates: [
      "Capacity to build genuine trust with students who have experienced repeated adult inconsistency",
      "Understanding that basic-needs support and relationship-building are prerequisites to academic engagement",
      "Long-term impact orientation: outcomes that extend well beyond the classroom and the school year",
    ],
  },
];

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
            Privacy-safe summaries demonstrating instructional impact and relationship-building. No student names, disability identifiers, or confidential details are included.
          </p>
        </div>
      </section>

      {/* Privacy Note */}
      <div className="bg-[#1E3A5F]/5 border-b border-[#1E3A5F]/10 py-4">
        <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center gap-3">
          <i className="ri-shield-check-line text-[#1E3A5F] text-base"></i>
          <p className="text-sm text-[#1E3A5F] font-['Inter']">
            Details shared with respect for student privacy. All stories are anonymized and privacy-safe.
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
            All details shared with respect for student privacy. No names, disability identifiers, or confidential information included.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
