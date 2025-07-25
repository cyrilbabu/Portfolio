import React from "react";
import TopDiv from "./(components)/TopDiv";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Navbar from "./(components)/Navbar";
import ContactMe from "../(components)/contact-me";

const AboutPage = ({ children }) => {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <TopDiv />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-32 py-8 text-white">
          <h1 className="text-xl md:text-4xl font-bold mb-4">
            Chropton Unsh Cyril Babu
          </h1>
          <h3 className="text-xl md:text-2xl border-l-4 border-red-500 pl-4">
            Senior Software Engineer.
          </h3>
          <h3 className="text-base md:text-lg pt-3">At Kipps Ai</h3>
          <p className="mt-4 text-base hidden md:block md:text-lg max-w-full md:max-w-[80%] lg:max-w-[40%]">
            I am a Senior Software Engineer with a passion for building scalable
            and efficient web applications. My expertise lies in full-stack
            development, and I have a strong background in both front-end and
            back-end technologies.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-2xl md:text-3xl">
            <a
              href="https://www.linkedin.com/in/chropton-unsh-cyril-babu-79119a284/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/cyrilbabu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <Navbar />
      {children}
    </>
  );
};

export default AboutPage;
