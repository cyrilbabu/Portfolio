import Link from "next/link";
import React from "react";
import {
  FaBriefcase,
  FaCertificate,
  FaProjectDiagram,
  FaTools,
  FaTrophy,
} from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";

const aboutDetails = [
  { title: "Experience", Icon: <FaBriefcase /> },
  { title: "Skills", Icon: <FaTools /> },
  { title: "Projects", Icon: <FaProjectDiagram /> },
  { title: "Education", Icon: <FaGraduationCap /> },
  { title: "Achievements", Icon: <FaTrophy /> },
  { title: "Certifications", Icon: <FaCertificate /> },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-yellow-400 py-12 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-950 drop-shadow-sm">
          Want to know more about me?
        </h1>
        <p className="text-blue-900 text-base sm:text-lg mt-2">
          Explore my journey, skills, and achievements in detail
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {aboutDetails.map((detail) => (
          <Link
            href={`/about/${detail.title.toLowerCase()}`}
            key={detail.title}
            className="bg-white/50 border-white border-2 rounded px-6 py-4 flex flex-col justify-between items-center hover:bg-white/70 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className="text-3xl sm:text-4xl p-4 sm:p-5 border-2 border-white rounded-full bg-white/60 text-blue-950 my-2">
              {detail.Icon}
            </div>
            <span className="font-semibold text-sm sm:text-base md:text-lg text-blue-950">
              {detail.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
