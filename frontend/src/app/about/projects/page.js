import React from "react";
import Carousel from "../(components)/Carousel";

export default async function ProjectsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/about/projects/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center">
        Failed to load project data
      </div>
    );
  }

  const projectData = await res.json();

  return (
    <div className="w-full px-8 md:px-36 py-12 bg-blue-950 text-white">
      <h1 className="text-4xl font-bold border-l-4 border-red-500 pl-4 mb-10">
        Projects
      </h1>

      {projectData.map((project, index) => (
        <div
          key={index}
          className="mb-16 bg-white/10 border border-white rounded-xl p-6 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
          <h3 className="text-lg italic text-gray-300 mb-4">
            {project.subtitle}
          </h3>

          <Carousel images={project.images} baseUrl={baseUrl} />

          <p className="text-sm text-gray-300 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills_used.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/10 border border-white px-3 py-1 rounded text-white text-sm"
              >
                <img
                  src={`${baseUrl}${skill.image}`}
                  alt={skill.name}
                  className="w-5 h-5"
                />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 text-sm">
            <a
              href={project.github_link}
              target="_blank"
              className="text-blue-400 underline"
            >
              GitHub Repo
            </a>
            <a
              href={project.live_link}
              target="_blank"
              className="text-green-400 underline"
            >
              Live Preview
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
