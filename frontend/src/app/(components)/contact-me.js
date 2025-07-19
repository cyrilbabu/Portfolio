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
    <div className="w-full mx-auto p-8 px-36 text-center text-gray-800 bg-yellow-400 bg-cover bg-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold  text-blue-950 drop-shadow-sm">
          Contact Me
        </h1>
        <p className="text-blue-900 text-lg mt-2">
          I&apos;m here to help you. Get in touch with me!
        </p>
      </div>
      <div className="w-full px-36 py-8 bg-white/60 rounded border-2 border-white">
        {/* Social Media and Contact Info */}
        <p className="text-lg mb-4 text-blue-950 font-bold">
          Professional Contact Information
        </p>
        <div className="flex justify-center items-center gap-8 mb-4">
          <div className="flex items-center space-x-2 w-full justify-center border-2 border-white bg-white/50 rounded px-4 py-2 mb-4">
            <FaPhone className="text-blue-950 text-4xl" />
            <span className="text-lg">+91 8279458423</span>
          </div>
          <div className="flex items-center space-x-2 w-full justify-center border-2 border-white bg-white/50 rounded px-4 py-2 mb-4">
            <IoIosMail className="text-blue-950 text-4xl" />
            <span className="text-lg">unshcyril@gmail.com</span>
          </div>
        </div>
        <p className="text-lg mb-6 font-bold text-blue-950">
          Social Media Links
        </p>
        <div className="flex justify-around items-center  gap-4">
          <a
            href="https://www.linkedin.com/in/chropton-unsh-cyril-babu-79119a284/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-950 text-4xl flex justify-center items-center w-full border-2 border-white bg-white/50 rounded px-4 py-2 hover:bg-blue-950 hover:text-white transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/cyrilbabu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-950 text-4xl flex justify-center items-center w-full border-2 border-white bg-white/50 rounded px-4 py-2 hover:bg-blue-950 hover:text-white transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-950 text-4xl flex justify-center items-center w-full border-2 border-white bg-white/50 rounded px-4 py-2 hover:bg-blue-950 hover:text-white transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-950 text-4xl flex justify-center items-center w-full border-2 border-white bg-white/50 rounded px-4 py-2 hover:bg-blue-950 hover:text-white transition-colors duration-300"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="mt-8 text-blue-950">
        made with ❤️ by Chropton Unsh Cyril Babu
      </div>
    </div>
  );
};

export default ContactMe;
