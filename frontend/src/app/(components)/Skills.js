import { BadgeCheck, AlertCircle, TrendingUp } from "lucide-react";

export default async function Skills() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/about/skills/`, {
    cache: "no-store", // disables caching
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center">Failed to load skills</div>
    );
  }

  const skillsData = await res.json();

  return (
    <div className="bg-blue-950 w-full px-36 pb-12">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        My Skills
      </h1>

      {skillsData.map((group, idx) => (
        <div key={idx} className="">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 border-l-4 border-red-500 pl-3">
            {group.domain}
          </h2>

          <div className="flex gap-6 flex-wrap">
            {group.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="bg-white/80 hover:scale-110 transition-transform backdrop-blur-md border border-white px-6 py-4 rounded text-white text-sm text-center"
              >
                <img
                  src={`${baseUrl}/${skill.image}/`}
                  alt={skill.name}
                  className="w-32 h-32 mb-2 object-contain"
                />
                <h3 className="text-lg font-bold my-2 text-blue-950">
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
