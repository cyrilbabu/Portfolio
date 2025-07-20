import Link from "next/link";
import React from "react";
import { CiSaveDown2 } from "react-icons/ci";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-36 py-4 border-b-2 border-yellow-400 bg-[#131628] text-white font-medium relative z-10">
      <Link href="/" className="flex items-center gap-2">
        <img src="/cyril.jpg" alt="Logo" className="w-12 h-12 rounded-full" />
        <span className="text-xl font-semibold text-white">
          C. U. Cyril Babu
        </span>
      </Link>

      {/* Center: Nav Links */}
      <div className="hidden md:flex items-center gap-10 text-lg">
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
          className="bg-white/25 hover:bg-white/50 transition border-2 flex gap-2 justify-center items-center border-white text-white px-6 py-1 rounded-lg text-lg shadow-md"
        >
          Resume <CiSaveDown2 />
        </a>
      </div>
    </nav>
  );
}
