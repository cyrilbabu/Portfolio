"use client";

import React, { useState } from "react";
import {
  FaYoutube,
  FaLinkedin,
  FaPhone,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}. Your message has been sent!`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer className="w-full mx-auto py-12 px-4 sm:px-8 md:px-16 lg:px-36 text-center text-gray-800 bg-yellow-400 bg-cover bg-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-950 drop-shadow-sm">
          Contact Me
        </h1>
        <p className="text-blue-900 text-base sm:text-lg mt-2">
          I&apos;m here to help you. Get in touch with me!
        </p>
      </div>

      <div className="w-full py-8 px-4 sm:px-6 md:px-12 bg-white/60 rounded border-2 border-white">
        {/* Contact Info */}
        <p className="text-lg sm:text-xl mb-4 text-blue-950 font-bold">
          Professional Contact Information
        </p>

        <div className="flex flex-col md:flex-row md:justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 justify-center border-2 border-white bg-white/50 rounded px-4 py-2 w-full md:w-1/2">
            <FaPhone className="text-blue-950 text-2xl sm:text-3xl" />
            <span className="text-sm sm:text-lg">+91 8279458423</span>
          </div>
          <div className="flex items-center gap-2 justify-center border-2 border-white bg-white/50 rounded px-4 py-2 w-full md:w-1/2">
            <IoIosMail className="text-blue-950 text-2xl sm:text-3xl" />
            <span className="text-sm sm:text-lg">unshcyril@gmail.com</span>
          </div>
        </div>

        {/* Social Links */}
        <p className="text-lg sm:text-xl mb-4 font-bold text-blue-950">
          Social Media Links
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              icon: <FaLinkedin />,
              href: "https://www.linkedin.com/in/chropton-unsh-cyril-babu-79119a284/",
            },
            {
              icon: <FaGithub />,
              href: "https://github.com/cyrilbabu",
            },
            {
              icon: <FaInstagram />,
              href: "https://instagram.com",
            },
            {
              icon: <FaYoutube />,
              href: "https://youtube.com",
            },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-950 text-3xl sm:text-4xl flex justify-center items-center w-16 h-16 border-2 border-white bg-white/50 rounded hover:bg-blue-950 hover:text-white transition-colors duration-300"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 text-blue-950 text-sm sm:text-base">
        made with ❤️ by Chropton Unsh Cyril Babu
      </div>
    </footer>
  );
};

export default ContactMe;
