import React from "react";
import { FaRobot, FaComments } from "react-icons/fa";
import Image from "next/image";
import AIInteraction from "./(components)/AIInteraction";
import Somedetails from "./(components)/Somedetails";
import ContactMe from "./(components)/contact-me";
import Link from "next/link";
import Typewrite from "./(components)/Typewriter";
import AboutSection from "./(components)/AboutSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden">
      <header className="relative bg-blue-950 flex flex-col-reverse md:flex-row items-center justify-between w-full text-white py-16 px-4 sm:px-8 md:px-16 lg:px-36 gap-12 md:gap-0">
        {/* Left Section */}
        <div className="z-10 w-full md:w-7/12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Hello,
            <br />
            <span className="text-yellow-500">
              I’m Chropton Unsh Cyril Babu
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold mt-4">
            <Typewrite />
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl leading-relaxed">
            Let’s build scalable, efficient, and innovative solutions together
            where every line of code is crafted with purpose and precision.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/voice-chat">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 text-base sm:text-lg font-semibold rounded-full shadow-lg transition-transform hover:scale-105 w-full sm:w-auto">
                <FaRobot className="text-xl" />
                Talk to AI Me
              </button>
            </Link>
            <Link href="/chat">
              <button className="flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 px-6 py-3 text-base sm:text-lg font-semibold rounded-full shadow-lg transition-transform hover:scale-105 w-full sm:w-auto">
                <FaComments className="text-xl" />
                Chat with AI Me
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section - Profile Image */}
        <div className="relative w-full md:w-5/12 flex justify-center">
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
            <div className="absolute inset-0 rounded-full bg-orange-500 z-0 scale-110 blur-2xl opacity-20" />
            <Image
              src="/cyril.jpg"
              alt="Chropton Unsh Cyril Babu"
              className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl border-8 p-3 border-white/20 hover:scale-105 transition-transform duration-300"
              width={320}
              height={320}
            />
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute w-full h-full top-0 left-0 bg-[url('/grid-bg.svg')] bg-cover opacity-20 z-0 pointer-events-none"></div>
      </header>

      {/* Additional Sections */}
      <Somedetails />
      <AboutSection />
      <AIInteraction />
    </div>
  );
}
