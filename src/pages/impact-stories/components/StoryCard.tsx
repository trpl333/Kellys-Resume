interface StoryCardProps {
  tag: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  demonstrates?: string[];
}

export default function StoryCard({
  tag,
  title,
  situation,
  task,
  action,
  result,
  demonstrates = [],
}: StoryCardProps) {
  return (
    <article className="bg-white rounded-3xl border border-[#E8E8E6] p-8 md:p-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">{tag}</p>
      <h2 className="font-['Crimson_Pro'] text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-10">
        {title}
      </h2>

      {/* STAR Narrative */}
      <div className="flex flex-col gap-6 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Situation</p>
          <p className="text-base text-[#4A4A4A] leading-relaxed font-['Inter']">{situation}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Task</p>
          <p className="text-base text-[#4A4A4A] leading-relaxed font-['Inter']">{task}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Action</p>
          <p className="text-base text-[#4A4A4A] leading-relaxed font-['Inter']">{action}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Result</p>
          <p className="text-base text-[#4A4A4A] leading-relaxed font-['Inter']">{result}</p>
        </div>
      </div>

      {demonstrates.length > 0 ? (
        <>
          <div className="w-4/5 h-px bg-[#E8E8E6] mb-10"></div>
          <div>
            <h3 className="text-base font-semibold text-[#1E3A5F] mb-5 font-['Inter']">
              What this demonstrates
            </h3>
            <ul className="flex flex-col gap-3">
              {demonstrates.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-checkbox-circle-line text-[#1E3A5F] text-base"></i>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-['Inter']">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </article>
  );
}
