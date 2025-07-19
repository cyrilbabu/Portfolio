"use client";

import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Typewrite() {
  return (
    <Typewriter
      words={[
        "Senior Software Engineer",
        "Full Stack Developer",
        "Python Developer",
      ]}
      loop={true}
      cursor
      cursorStyle="|"
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1000}
    />
  );
}
