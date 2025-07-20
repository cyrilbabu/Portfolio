// "use client";
// import { useUserStore } from "@/store/userStore";
import ContactMe from "./(components)/contact-me";
import Navbar from "./(components)/Navbar";
import "./globals.css";

import Head from "next/head";
// import { useEffect } from "react";

// const generateRandomUserId = () =>
//   Math.floor(100000 + Math.random() * 900000).toString();

export default function RootLayout({ children }) {
  // const setUserId = useUserStore((state) => state.setUserId);

  // useEffect(() => {
  //   setUserId(generateRandomUserId());
  // }, [setUserId]);

  return (
    <html lang="en" className="min-h-screen w-full">
      <head>
        <title>Cyril Babu&apos;s Blog</title>
        <link rel="icon" href="/cyril.jpg" />
      </head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Cyril Babu's personal blog site" />
      <meta
        name="keywords"
        content="Cyril Babu, Blogs, Personal Blog, Web Development"
      />
      <meta name="author" content="Cyril Babu" />
      <meta name="theme-color" content="#131628" />
      <link rel="apple-touch-icon" href="/cyril.jpg" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <body className="min-h-screen w-full">
        <div className="bg-gray-100 min-h-screen w-full flex flex-col">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <ContactMe />
        </div>
      </body>
    </html>
  );
}
