"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation"; // ✅ Correct hook for App Router

function NavbarItem({ title, selected, setSelected }) {
  return (
    <Link
      href={title === "Home" ? "/about" : `/about/${title.toLowerCase()}`}
      className={`p-2 w-full text-center font-bold text-lg ${
        selected ? "border-2 border-white bg-white/30 rounded" : ""
      }`}
    >
      <div onClick={() => setSelected(title)}>{title}</div>
    </Link>
  );
}

export default function Navbar() {
  const [selected, setSelected] = React.useState("Home");
  const pathname = usePathname(); // ✅

  useEffect(() => {
    const path = pathname.split("/").pop();
    setSelected(path.charAt(0).toUpperCase() + path.slice(1) || "Home");
  }, [pathname]);

  return (
    <div className="flex bg-blue-950 text-white justify-around px-32">
      <NavbarItem
        title="Home"
        selected={selected === "Home"}
        setSelected={setSelected}
      />
      <NavbarItem
        title="Experience"
        selected={selected === "Experience"}
        setSelected={setSelected}
      />
      <NavbarItem
        title="Skills"
        selected={selected === "Skills"}
        setSelected={setSelected}
      />
      <NavbarItem
        title="Projects"
        selected={selected === "Projects"}
        setSelected={setSelected}
      />
      <NavbarItem
        title="Achievements"
        selected={selected === "Achievements"}
        setSelected={setSelected}
      />
      <NavbarItem
        title="Certifications"
        selected={selected === "Certifications"}
        setSelected={setSelected}
      />
      <NavbarItem
        title="Education"
        selected={selected === "Education"}
        setSelected={setSelected}
      />
    </div>
  );
}
