import React from "react";
import Head from "next/head"; // For SEO meta tags
import TopDiv from "./(components)/TopDiv";
import { FaLinkedin, FaYoutube, FaInstagram, FaGithub } from "react-icons/fa";
import Navbar from "./(components)/Navbar";

const AboutPage = ({ children }) => {
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>About Chropton Unsh Cyril Babu | Senior Software Engineer</title>
        <meta
          name="description"
          content="Learn more about Chropton Unsh Cyril Babu, a Senior Software Engineer at Kipps Ai specializing in full-stack development, scalable applications, and cutting-edge web technologies, ."
        />
        <meta
          name="keywords"
          content="Chropton Unsh Cyril Babu, Senior Software Engineer, Full Stack Developer, Cyril Babu, Web Development"
        />
        <meta name="author" content="Cyril Babu" />
        <meta property="og:title" content="About Chropton Unsh Cyril Babu" />
        <meta
          property="og:description"
          content="Senior Software Engineer passionate about building scalable web applications at Kipps Ai."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://chropton-unsh-cyril-babu.onemoredevs.com/about"
        />
        <meta property="og:image" content="/cyril-removebg.png" />
        <link
          rel="canonical"
          href="https://chropton-unsh-cyril-babu.onemoredevs.com/about"
        />
      </Head>

      <main>
        <div className="hidden md:block relative w-full overflow-hidden">
          {/* Background Layer */}
          <div className="hidden md:block absolute inset-0 z-0">
            <TopDiv />
          </div>

          {/* Foreground Content */}
          <section
            className="relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-32 py-8 text-white"
            aria-labelledby="about-heading"
          >
            <h1
              id="about-heading"
              className="hidden md:block text-xl md:text-4xl font-bold mb-4"
            >
              About Me - Chropton Unsh Cyril Babu
            </h1>
            <h2 className="hidden md:block text-xl md:text-2xl border-l-4 border-red-500 pl-4">
              Senior Software Engineer
            </h2>
            <h3 className="text-base hidden md:block md:text-lg pt-3">
              At Kipps Ai
            </h3>
            <p className="mt-4 text-base hidden md:block md:text-lg max-w-full md:max-w-[80%] lg:max-w-[40%]">
              I am a Senior Software Engineer with a passion for building
              scalable and efficient web applications. My expertise lies in
              full-stack development, and I have a strong background in both
              front-end and back-end technologies.
            </p>

            {/* ✅ Social Links with descriptive text */}
            <nav
              className="hidden md:flex mt-8 flex-wrap gap-4 text-2xl md:text-3xl"
              aria-label="Social Media Links"
            >
              <a
                href="https://www.linkedin.com/in/chropton-unsh-cyril-babu-79119a284/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/cyrilbabu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub Profile"
                title="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.youtube.com/@ChroptonExplores"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit YouTube Channel"
                title="YouTube Channel"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.instagram.com/cyril.babu?igsh=cnBtZjhuYjlsMWpm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Instagram Profile"
                title="Instagram Profile"
              >
                <FaInstagram />
              </a>
            </nav>
          </section>
        </div>

        <div className="hidden md:block w-full">
          <Navbar />
        </div>
        {children}
      </main>
    </>
  );
};

export default AboutPage;
