import React from "react";
import { Briefcase, Code, CheckCircle } from "lucide-react";

const Somedetails = () => {
  // Start dates for professional and coding experience
  const professionalStartDate = new Date("2024-08-01"); // Example: Jan 1, 2018
  const codingStartDate = new Date("2019-04-01"); // Example: June 15, 2015

  // Function to calculate years, months, and days
  const calculateExperience = (startDate) => {
    const now = new Date();
    const years = now.getFullYear() - startDate.getFullYear();
    const months = now.getMonth() - startDate.getMonth();
    const days = now.getDate() - startDate.getDate();

    let adjustedYears = years;
    let adjustedMonths = months;
    let adjustedDays = days;

    if (adjustedDays < 0) {
      adjustedMonths -= 1;
      adjustedDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Days in the previous month
    }

    if (adjustedMonths < 0) {
      adjustedYears -= 1;
      adjustedMonths += 12;
    }

    return { years: adjustedYears, months: adjustedMonths, days: adjustedDays };
  };

  const professionalExperience = calculateExperience(professionalStartDate);
  const codingExperience = calculateExperience(codingStartDate);

  return (
    <div className="relative bg-blue-950 px-8 pb-12 w-full  text-white flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-36">
        {/* Professional Experience Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg text-white text-sm text-center">
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-yellow-300 text-blue-900 shadow-lg">
            <Briefcase className="w-8 h-8" />
          </div>
          <p className="text-2xl font-bold">
            {professionalExperience.years} Years,{" "}
            {professionalExperience.months} Months,{" "}
            {professionalExperience.days} Days
          </p>
          <p>Professional Experience</p>
        </div>

        {/* Coding Experience Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg text-white text-sm text-center">
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-yellow-300 text-blue-900 shadow-lg">
            <Code className="w-8 h-8" />
          </div>
          <p className="text-2xl font-bold">
            {codingExperience.years} Years, {codingExperience.months} Months,{" "}
            {codingExperience.days} Days
          </p>
          <p>Coding Experience</p>
        </div>

        {/* Projects Done Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg text-white text-sm text-center">
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-yellow-300 text-blue-900 shadow-lg">
            <CheckCircle className="w-8 h-8" />
          </div>
          <p className="text-2xl font-bold">45+</p>
          <p>Projects Done</p>
        </div>
      </div>
    </div>
  );
};

export default Somedetails;
