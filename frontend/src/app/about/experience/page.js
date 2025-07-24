import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default async function ExperiencePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/about/experiences/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center">
        Failed to load experience data
      </div>
    );
  }

  const experienceData = await res.json();

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-36 py-10 bg-blue-950">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold border-l-4 text-white border-red-500 pl-4 mb-8">
        Experience
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {experienceData.map((exp, index) => (
          <div
            key={index}
            className="bg-white/20 border-2 border-white rounded shadow-md p-5 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
              <img
                src={`${baseUrl}${exp.company_logo}`}
                alt={exp.company_name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-white"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {exp.company_name}
                </h2>
                <p className="text-gray-300 text-sm flex items-center gap-2 justify-center sm:justify-start">
                  <FaMapMarkerAlt /> {exp.location}
                </p>
              </div>
            </div>

            {exp.timelines
              .slice()
              .reverse()
              .map((timeline, i) => (
                <div key={i} className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <h3 className="text-base sm:text-lg text-white font-semibold border-l-4 border-red-500 pl-2 mb-2 sm:mb-0">
                      {timeline.job_role}
                    </h3>
                    <div className="text-sm text-gray-200 flex items-center gap-2">
                      <FaCalendarAlt />
                      {new Date(timeline.start_date).toLocaleDateString(
                        "en-IN",
                        {
                          year: "numeric",
                          month: "short",
                        }
                      )}{" "}
                      -{" "}
                      {timeline.end_date
                        ? new Date(timeline.end_date).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                            }
                          )
                        : "Present"}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-2">
                    {timeline.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {timeline.skills_used.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-white/10 border border-white px-3 py-1 rounded text-white text-sm"
                      >
                        <img
                          src={`${baseUrl}${skill.image}`}
                          alt={skill.name}
                          className="w-5 h-5 object-contain"
                        />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
