const tiles = [
  {
    icon: "ri-time-line",
    number: "26+",
    title: "Years Teaching",
    sub: "TK–8, public & private",
  },
  {
    icon: "ri-group-line",
    number: "3",
    title: "Inclusion · RSP · SDC",
    sub: "Full spectrum SPED delivery",
  },
  {
    icon: "ri-award-line",
    number: "Field",
    title: "Chapman Supervisor",
    sub: "Credential evaluator & CalTPA coach",
  },
  {
    icon: "ri-graduation-cap-line",
    number: "M.A.",
    title: "Special Education",
    sub: "Chapman University, Orange CA",
  },
];

export default function AtAGlance() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] mb-4">
            Quick Overview
          </p>
          <h2 className="font-['Crimson_Pro'] text-4xl md:text-5xl font-bold text-[#2D2D2D]">
            At a Glance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className="group border border-[#E8E8E6] rounded-2xl p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1E3A5F]/8 mb-5">
                <i className={`${tile.icon} text-2xl text-[#1E3A5F]`}></i>
              </div>
              <p className="font-['Crimson_Pro'] text-4xl font-bold text-[#1E3A5F] mb-2">
                {tile.number}
              </p>
              <p className="text-base font-semibold text-[#2D2D2D] mb-2 font-['Inter']">
                {tile.title}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed font-['Inter']">{tile.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
