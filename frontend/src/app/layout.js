// "use client";
// import { useUserStore } from "@/store/userStore";
import ContactMe from "./(components)/contact-me";
import Navbar from "./(components)/Navbar";
import "./globals.css";
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
