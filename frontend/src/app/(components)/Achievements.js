import { Trophy, Award, Users, Zap, Target, Star } from "lucide-react";

const achievements = [
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Tech Excellence Award",
    description:
      "Recognized for outstanding technical leadership and innovation in 2023",
    year: "2023",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Leadership",
    description:
      "Successfully led 3 cross-functional teams totaling 25+ developers",
    year: "2021-2024",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance Optimization",
    description:
      "Improved system performance by 60% across multiple applications",
    year: "2022",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Project Delivery",
    description: "100% on-time delivery rate for 15+ major projects",
    year: "2020-2024",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Certified Solutions Architect",
    description: "AWS Solutions Architect Professional certification",
    year: "2022",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Open Source Contributor",
    description:
      "Active contributor to 10+ open source projects with 500+ GitHub stars",
    year: "2019-2024",
  },
];
// bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500
export default function AchievementsSection() {
  return (
    <section className="w-full bg-yellow-400  py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold  text-blue-950 drop-shadow-sm">
          Achievements
        </h1>
        <p className="text-blue-900 text-lg mt-2">
          Highlights of my career milestones and contributions
        </p>
      </div>

      <div className="grid px-6 md:px-16 lg:px-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="rounded-2xl border border-blue-200 bg-blue-950 text-white p-6 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-yellow-300 text-blue-900 shadow-lg">
              {achievement.icon}
            </div>
            <h3 className="text-xl font-semibold text-yellow-300">
              {achievement.title}
            </h3>
            <p className="text-blue-100 mt-2">{achievement.description}</p>
            <p className="text-sm font-semibold text-yellow-400 mt-3">
              {achievement.year}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
