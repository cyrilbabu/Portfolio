import React from "react";
import { Briefcase, CheckCircle } from "lucide-react";
import { FaLaptopCode } from "react-icons/fa";

const Somedetails = () => {
  const professionalStartDate = new Date("2024-08-01");
  const codingStartDate = new Date("2019-04-01");

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
      adjustedDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
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
    <div className="relative bg-blue-950 px-4 sm:px-10 lg:px-20 xl:px-36 pb-12 w-full text-white flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl">
        {/* Card Template */}
        {[
          {
            icon: <Briefcase className="w-8 h-8" />,
            label: "Professional Experience",
            value: `${professionalExperience.years} Years, ${professionalExperience.months} Months, ${professionalExperience.days} Days`,
          },
          {
            icon: <FaLaptopCode className="w-8 h-8" />,
            label: "Coding Experience",
            value: `${codingExperience.years} Years, ${codingExperience.months} Months, ${codingExperience.days} Days`,
          },
          {
            icon: <CheckCircle className="w-8 h-8" />,
            label: "Projects Done",
            value: "45+",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border-2 border-white p-6 rounded-lg text-sm text-center"
          >
            <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-yellow-300 text-blue-900 shadow-lg">
              {item.icon}
            </div>
            <p className="text-2xl font-bold">{item.value}</p>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Somedetails;
