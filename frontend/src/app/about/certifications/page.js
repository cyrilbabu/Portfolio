import React from "react";
import { FaCalendarCheck } from "react-icons/fa";

export default async function CertificationPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/about/certifications/`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return (
      <div className="text-red-500 text-center">
        Failed to load certifications
      </div>
    );
  }

  const certificationsData = await res.json();

  return (
    <div className="w-full px-36 py-8 bg-blue-950">
      <h1 className="text-4xl font-bold border-l-4 text-white border-red-500 pl-4 mb-8">
        Certifications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {certificationsData.map((certification) => (
          <div
            key={certification.id}
            className="bg-white/20 border-2 border-white rounded shadow-md p-4 hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={`${baseUrl}/${certification.image}`}
              alt={certification.title}
              className="w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-white border-l-4 border-red-500 pl-2 mb-2">
              {certification.title}
            </h2>

            <div className="text-sm text-gray-300 mb-2">
              {certification.description}
            </div>

            <div className="text-sm text-gray-50 flex items-center ">
              <p className="flex items-center gap-2 border-2 bg-white/10 border-white rounded px-4 py-1">
                <FaCalendarCheck />
                {new Date(certification.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
