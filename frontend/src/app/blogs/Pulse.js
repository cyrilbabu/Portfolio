"use client";

import { useState } from "react";
import { PiSpeakerHighFill } from "react-icons/pi";

import { motion } from "framer-motion";

export default function BlogSpeaker({ blog }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakBlog = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop current speech
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      `Title: ${blog.title}. Summary: ${blog.description}`
    );

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        isSpeaking
          ? "animate-pulse text-white border-2 p-2 rounded border-white bg-white/30"
          : ""
      }`}
      onClick={speakBlog}
    >
      <PiSpeakerHighFill size={24} />
    </div>
  );
}
