"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import axios from "axios";

export default function Screen_before_call({ setToken, setUrl }) {
  const [callType, setCallType] = useState("audio");

  const fetchToken = async (callType) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    console.log("Fetching token for call type:", callType);

    try {
      const res = await axios.get(
        `${baseUrl}/bot/voicebot/?call_type=${callType}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToken(res.data.token);
      setUrl(res.data.url);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4 border-r-2 border-white p-8">
        <div className="text-white text-3xl font-bold text-center">
          Welcome to My Voice Chat
        </div>

        <div className="rounded-full w-52 h-52 border-4 border-white/40 shadow-lg overflow-hidden flex items-center justify-center">
          <Image
            src="/ai-cyril.png"
            alt="AI Avatar"
            width={208}
            height={208}
            className="rounded-full object-cover"
          />
        </div>

        <p className="text-white text-sm text-center opacity-70 max-w-sm">
          I&apos;m AI version of Cyril. Select a topic you&apos;d like to
          explore — from my personal journey to projects, blogs, and beyond.
        </p>

        <div className="flex gap-4 mt-4">;</div>
      </div>
      <div className="w-1/2  flex flex-col items-center justify-center gap-4 p-8">
        <div className="text-white text-3xl font-bold mb-2 text-center w-full">
          Choose Your Conversation
        </div>
        <p className="text-white text-sm text-center opacity-70 mb-4 max-w-md">
          Select a topic below to start a voice chat with me. I can discuss my
        </p>

        <div className="flex flex-col w-full gap-3">
          <button
            className="bg-white/10 border border-white/60 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-200 text-white font-medium py-3 px-4 rounded-lg"
            onClick={() => fetchToken("blogs")}
          >
            📚 Discover My Blogs
          </button>
          <button
            className="bg-white/10 border border-white/60 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-200 text-white font-medium py-3 px-4 rounded-lg"
            onClick={() => fetchToken("projects")}
          >
            💡 Explore My Projects
          </button>
          <button
            className="bg-white/10 border border-white/60 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-200 text-white font-medium py-3 px-4 rounded-lg"
            onClick={() => fetchToken("know_me")}
          >
            🙋‍♂️ Get to Know Me
          </button>
          <button
            className="bg-white/10 border border-white/60 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-200 text-white font-medium py-3 px-4 rounded-lg"
            onClick={() => fetchToken("general")}
          >
            🗣️ Start a Conversation
          </button>
        </div>
      </div>
    </div>
  );
}
