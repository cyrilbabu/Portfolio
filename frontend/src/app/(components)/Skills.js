import { BadgeCheck, AlertCircle, TrendingUp } from "lucide-react";

export default async function Skills() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/about/skills/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center">Failed to load skills</div>
    );
  }

  const skillsData = await res.json();

  return (
    <div className="bg-blue-950 w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 pb-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold border-l-4 border-red-500 pl-4 mb-8 text-white">
        Skills
      </h1>

      {skillsData.map((group, idx) => (
        <div key={idx}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-white mt-6">
            {group.domain}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {group.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="bg-white/50 hover:scale-105 transition-transform duration-200 backdrop-blur-md border border-white px-4 py-4 rounded text-white text-sm text-center shadow-md"
              >
                <img
                  src={`${baseUrl}/${skill.image}/`}
                  alt={skill.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-2 mx-auto object-contain"
                />
                <h3 className="text-base sm:text-lg font-bold my-2 text-blue-950">
                  {skill.name}
                </h3>
                <p
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold
                    ${
                      skill.level === "Expert"
                        ? "bg-green-700 text-green-100"
                        : skill.level === "Intermediate"
                        ? "bg-blue-800 text-blue-100"
                        : "bg-red-700 text-red-100"
                    }`}
                >
                  {skill.level === "Expert" && <BadgeCheck size={16} />}
                  {skill.level === "Intermediate" && <TrendingUp size={16} />}
                  {skill.level === "Beginner" && <AlertCircle size={16} />}
                  {skill.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
