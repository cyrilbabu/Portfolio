"use client";

import { useState } from "react";

export default function AIInteraction() {
  return (
    <section className="py-16 px-4 bg-blue-950 transition-colors w-full duration-300">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Why To Scroll When You Can Ask?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Get instant answers about my experience, skills, and projects.
            Choose your preferred way to interact with my AI assistant.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
          {/* Chat Button */}
          <button
            onClick={() => (window.location.href = "/chat")}
            className="group relative bg-yellow-400 hover:bg-yellow-500 text-blue-950 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center"
          >
            <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <span>Chat with AI Me</span>
            <div className="absolute inset-0 rounded-full bg-yellow-300/20 animate-pulse-glow pointer-events-none"></div>
          </button>

          {/* Call Button */}
          <button
            onClick={() => (window.location.href = "/voice-chat")}
            className="group relative bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center"
          >
            <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <span>Call AI Me</span>
            <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-pulse-glow pointer-events-none"></div>
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-gray-600 dark:text-gray-300 rounded-lg p-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <svg
              className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-sm">Instant responses about my experience</span>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-gray-600 dark:text-gray-300 rounded-lg p-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <svg
              className="w-5 h-5 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-sm">Available 24/7 for questions</span>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-gray-600 dark:text-gray-300 rounded-lg p-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <svg
              className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="text-sm">Learn about my projects & skills</span>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-gray-600 dark:text-gray-300 rounded-lg p-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <svg
              className="w-5 h-5 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </div>
          <span className="text-sm">Get career advice & insights</span>
        </div>
      </div>
    </section>
  );
}
