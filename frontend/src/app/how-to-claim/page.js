import React from "react";

export default function Page() {
  const steps = [
    {
      id: 1,
      title: "Find and Click the Hidden Words",
      description:
        "There are random words hidden across the website. They can be anywhere. Find them and click on them.",
      img: "/find.png", // Replace with your image
    },
    {
      id: 2,
      title: "Winning Page",
      description:
        "After clicking the hidden word, you will be redirected to the winning page.",
      img: "/winning_page.png", // Replace with your image
    },
    {
      id: 3,
      title: "Fill the Form",
      description:
        "Enter your Name, Email, and UPI ID in the form. Your prize will be transferred to this UPI ID.",
      img: "/fill_form.png", // Replace with your image
    },
    {
      id: 4,
      title: "Receive Your Prize",
      description:
        "Once the form is submitted, we will transfer the money to your UPI ID.",
        img : "/win_page.png",
    },
    {
      id: 5,
      title: "Thank You for Participating",
      description:
        "Enjoy your reward and keep exploring for more hidden words on our site!",
    },
  ];

  return (
    <div className="bg-yellow-400 min-h-screen text-blue-950 py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        How to Win the Prize Money
      </h1>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-5 top-0 bottom-0 w-1 bg-white/40"></div>

        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start mb-10 relative">
            {/* Circle */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-blue-950 font-bold z-10">
              {step.id}
            </div>

            {/* Card */}
            <div className="ml-6 bg-white/20 border-2 border-white rounded-lg p-6 shadow-lg flex-1">
              {step.img && (
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-8/12 mb-4 object-contain mx-auto"
                />
              )}
              <h2 className="text-xl font-semibold mb-2 border-l-4 border-red-500 pl-4">{step.title}</h2>
              <p className="text-blue-800">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
