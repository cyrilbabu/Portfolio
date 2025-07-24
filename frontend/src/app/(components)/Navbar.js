"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full border-b-2 border-yellow-400 bg-[#131628] text-white font-medium relative z-10">
      <div className="flex justify-between items-center py-4 px-4 sm:px-8 md:px-16 lg:px-36">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/cyril.jpg" alt="Logo" className="w-12 h-12 rounded-full" />
          <span className="text-lg sm:text-xl font-semibold text-white">
            C. U. Cyril Babu
          </span>
        </Link>

        {/* Right: Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-10 text-base lg:text-lg">
          <Link href="/" className="hover:text-orange-500 transition">
            Home
          </Link>
          <Link href="/blogs" className="hover:text-orange-500 transition">
            Blogs
          </Link>
          <Link href="/about" className="hover:text-orange-500 transition">
            About
          </Link>
          <a
            href="#resume"
            download={true}
            className="bg-white/25 hover:bg-white/50 transition border-2 flex gap-2 justify-center items-center border-white text-white px-4 py-1 rounded-lg shadow-md"
          >
            Resume <CiSaveDown2 />
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-6 bg-[#1a1d34] text-base text-white">
          <Link
            href="/"
            className="hover:text-orange-500 transition"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className="hover:text-orange-500 transition"
            onClick={toggleMenu}
          >
            Blogs
          </Link>
          <Link
            href="/about"
            className="hover:text-orange-500 transition"
            onClick={toggleMenu}
          >
            About
          </Link>
          <a
            href="#resume"
            download={true}
            onClick={toggleMenu}
            className="bg-white/25 hover:bg-white/50 transition border-2 flex gap-2 justify-center items-center border-white text-white px-4 py-1 rounded-lg shadow-md"
          >
            Resume <CiSaveDown2 />
          </a>
        </div>
      )}
    </nav>
  );
}
