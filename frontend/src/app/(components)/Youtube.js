import React from "react";
import { FaYoutube } from "react-icons/fa";

export default function YouTubeSection() {
  return (
    <section className="bg-blue-950 w-full py-16 px-6 text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <FaYoutube className="text-red-600 animate-pulse text-5xl" />
            Subscribe to My YouTube Channel
          </h2>

          <h2 className="text-2xl border-l-4 border-red-500 pl-4 font-bold flex items-center gap-3">
            Chropton Explores
          </h2>

          <p className="text-lg text-blue-200">
            Join me on my YouTube journey where I explore the world of
            technology, gaming, and more! Your support means a lot, and
            subscribing helps me create more content for you.
          </p>
          <a
            href="https://www.youtube.com/@ChroptonExplores" // Replace with actual channel URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-semibold text-lg"
          >
            👉 Visit My Channel
          </a>
        </div>

        {/* Right Image or Thumbnail */}
        <div className="flex-1 w-full">
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-blue-900">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ShPTaCJqeFo?autoplay=1&mute=1" // Replace with actual video URL
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
