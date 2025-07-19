import React from "react";
import { FaCalendarCheck } from "react-icons/fa";

export default async function AchievementsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/about/achievements/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center">
        Failed to load achievements
      </div>
    );
  }

  const achievementsData = await res.json();

  return (
    <div className="w-full px-36 py-8 bg-blue-950">
      <h1 className="text-4xl font-bold border-l-4 text-white border-red-500 pl-4 mb-8">
        Achievements
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {achievementsData.map((achievement) => (
          <div
            key={achievement.id}
            className="bg-white/20 border-2 border-white rounded overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                {achievement.logo && (
                  <img
                    src={`${baseUrl}${achievement.logo}`}
                    alt="Logo"
                    className="w-10 h-10 object-contain bg-white rounded-full p-1 border"
                  />
                )}
                <h2 className="text-lg font-semibold text-white border-l-4 border-red-500 pl-2">
                  {achievement.title}
                </h2>
              </div>

              <p className="text-gray-200 text-sm mb-2">
                {achievement.description}
              </p>

              <div className="flex items-center text-sm text-gray-100 mt-4 gap-2">
                <FaCalendarCheck />
                <span>
                  {new Date(achievement.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
