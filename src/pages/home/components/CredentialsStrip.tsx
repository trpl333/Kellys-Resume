const credentials = [
  "Clear Ed Specialist (Mild/Moderate) Jun 2019",
  "Multiple Subject (Renewal Jan 1, 2021)",
  "CLAD Nov 2006",
  "IB PYP Mar 2007",
];

export default function CredentialsStrip() {
  return (
    <section className="bg-[#F5F5F3] py-6 border-y border-[#E8E8E6]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {credentials.map((cred, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-sm text-gray-500 font-['Inter'] whitespace-nowrap">{cred}</span>
              {i < credentials.length - 1 && (
                <span className="text-gray-300 hidden sm:inline">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
