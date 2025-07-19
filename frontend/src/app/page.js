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
    <div className="flex flex-col items-center justify-center w-full">
      <header className="relative bg-blue-950 flex items-center justify-center w-full text-white py-16 px-6">
        {/* Left Section */}
        <div className="z-10 w-8/12 h-full pl-36 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Hello,
            <br />
            <span className="text-yellow-500">
              I’m Chropton Unsh Cyril Babu
            </span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            <Typewrite />
          </h2>
          <p className="text-gray-300 mt-4 max-w-md leading-relaxed">
            Let’s build scalable, efficient, and innovative solutions together
            where every line of code is crafted with purpose and precision.
          </p>
          <div className="mt-8 flex items-center gap-4">
            {/* Button: Talk to AI */}
            <Link href="/voice-chat">
              <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-lg transition-transform hover:scale-105">
                <FaRobot className="text-xl" />
                Talk to AI Me
              </button>
            </Link>
            {/* <VoicebotButton text="Talk to AI Me" /> */}
            <Link href="/chat">
              <button className="flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 px-6 py-3 text-lg font-semibold rounded-full shadow-lg transition-transform hover:scale-105">
                <FaComments className="text-xl" />
                Chat with AI Me
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-4/12">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
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
      <Somedetails />
      <AboutSection />
      <AIInteraction />
    </div>
  );
}
