import type { ReactNode } from "react";

interface StoryCardProps {
  tag: string;
  title: string;
  hook: string;
  situation: string;
  whatKellyDid: string;
  result: string;
  demonstrates?: string[];
}

function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-[#E8E8E6]/80 pt-5 first:border-t-0 first:pt-0">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E3A5F] mb-2">{label}</p>
      <p className="text-[15px] md:text-base text-[#3D3D3D] leading-relaxed font-['Inter']">{children}</p>
    </div>
  );
}

export default function StoryCard({
  tag,
  title,
  hook,
  situation,
  whatKellyDid,
  result,
  demonstrates = [],
}: StoryCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#E4E1DA] bg-white shadow-[0_2px_20px_-10px_rgba(30,58,95,0.1)] transition-shadow duration-300 hover:shadow-[0_10px_36px_-14px_rgba(30,58,95,0.16)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E3A5F]/40 via-[#1E3A5F]/20 to-transparent opacity-80" aria-hidden />

      <div className="p-7 md:p-9 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1E3A5F]/90 mb-4">{tag}</p>

        <h2 className="font-['Crimson_Pro'] text-2xl md:text-3xl lg:text-[2rem] font-bold text-[#2D2D2D] mb-7 leading-snug">
          {title}
        </h2>

        <div className="mb-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]/70 mb-2.5 font-['Inter']">
            Impact in one line
          </p>
          <div className="border-l-[3px] border-[#1E3A5F]/45 pl-4 md:pl-5 py-0.5">
            <p className="text-[17px] md:text-lg font-semibold text-[#1E3A5F] leading-snug font-['Inter'] tracking-tight">
              {hook}
            </p>
          </div>
        </div>

        {/* Outcome — impact leads */}
        <div className="mb-11 rounded-2xl border border-[#1E3A5F]/28 bg-gradient-to-br from-[#1E3A5F]/[0.14] to-[#EDE8DF] px-5 py-5 md:px-6 md:py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_0_rgba(30,58,95,0.06)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1E3A5F] mb-2.5">Outcome</p>
          <p className="text-base md:text-[17px] text-[#1a1a1a] leading-relaxed font-['Inter'] font-semibold">{result}</p>
        </div>

        <div className="flex flex-col gap-5 mt-1">
          <Section label="What was happening">{situation}</Section>
          <Section label="What Kelly did">{whatKellyDid}</Section>
        </div>

        {demonstrates.length > 0 ? (
          <>
            <div className="my-8 h-px w-full max-w-md bg-gradient-to-r from-[#1E3A5F]/12 to-transparent" />
            <div>
              <h3 className="text-sm font-semibold text-[#1E3A5F] mb-3 font-['Inter'] tracking-tight">
                What this demonstrates
              </h3>
              <ul className="flex flex-col gap-2.5">
                {demonstrates.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#1E3A5F]">
                      <i className="ri-checkbox-circle-fill text-base opacity-90" aria-hidden />
                    </span>
                    <p className="text-sm text-[#555] leading-relaxed font-['Inter']">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
