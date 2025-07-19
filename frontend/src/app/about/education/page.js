import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
export default function EducationPage() {
  const educationData = [
    {
      degree: "Bachelor of Technology",
      stream: "Computer Science",
      institution: "Rajkiya Engineering College Sonbhadra",
      institutionLogo: "/recsonbhadra_logo.jpeg",
      location: "Sonbhadra, India",
      year: "2021 - 2025",
      description:
        "Studied core concepts of computer science including web development, data structures, and software engineering.",
    },
    {
      degree: "Senior Secondary (12 Class)",
      stream: "Science with Computer Science",
      institution: "Army Public School, Bareilly",
      institutionLogo: "/aps.png",
      location: "Bareilly, India",
      year: "2019 - 2020",
      description:
        "This was the phase where I developed a strong foundation in computer science and mathematics.",
    },
    {
      degree: "High School (10 Class)",
      institution: "Army Public School, Bareilly",
      stream: "Science with Computer Science",
      institutionLogo: "/aps.png",
      location: "Bareilly, India",
      year: "2017 - 2018",
      description:
        "Completed senior secondary education with a focus on Science subjects.",
    },
  ];

  return (
    <div className="w-full px-36 py-12 bg-blue-950 text-white">
      <h1 className="text-4xl font-bold border-l-4 border-red-500 pl-4 mb-8">
        Education
      </h1>

      <div className="space-y-10">
        {educationData.map((edu, index) => (
          <div
            key={index}
            className="bg-white/20 border-2 border-white text-gray-900 rounded-xl shadow-lg p-6 hover:scale-[1.01] transition-transform"
          >
            <div className="flex w-full gap-4">
              <div className="w-3/12 flex justify-center items-center ">
                <img
                  src={edu.institutionLogo}
                  alt={`${edu.institution} Logo`}
                  className={`h-40 object-cover ${
                    edu.institution ===
                      "Rajkiya Engineering College Sonbhadra" && "rounded-full"
                  }`}
                />
              </div>
              <div className="w-8/12 flex flex-col ">
                <h2 className="text-2xl text-white font-bold mb-2">
                  {edu.degree}
                </h2>
                <p className="border-l-4 border-red-500 pl-2 font-semibold text-lg text-gray-200 mb-4">
                  {edu.stream}
                </p>
                <div className="flex space-x-6  ">
                  <p className="text-sm flex items-center gap-1 text-white px-2 py-1 border-2 border-white rounded-lg mb-4">
                    <FaGraduationCap />
                    {edu.institution}
                  </p>
                  <p className="text-sm flex items-center gap-1 text-white px-2 py-1 border-2 border-white rounded-lg mb-4">
                    <FaCalendarAlt />
                    {edu.year}
                  </p>
                </div>
                <p className="text-gray-300 text-sm">{edu.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
