import "./globals.css";
import ContactMe from "./(components)/contact-me";
import Navbar from "./(components)/Navbar";
import Script from "next/script";

export const metadata = {
  title: "Cyril Babu's Blog",
  description: "Coding blogs and dev insights by Chropton Unsh Cyril Babu.",
  keywords: [
    "Chropton Unsh Cyril Babu",
    "Chropton Unsh Cyril Babu Blogs",
    "Cyril Babu",
    "Chropton Unsh",
    "Web Dev Blog",
    "Liveket Blog",
    "Python",
    "Django",
    "Flask",
    "React",
    "Next.js",
    "JavaScript",
  ],
  authors: [{ name: "Chropton Unsh Cyril Babu" }],
  creator: "Chropton Unsh Cyril Babu",
  robots: "index, follow",
  themeColor: "#131628",
  icons: {
    icon: "/cyril-removebg.png",
    apple: "/cyril-removebg.png",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    title: "Cyril Babu's Blog",
    description: "Web dev blog by Chropton Unsh Cyril Babu",
    url: "https://chropton-unsh-cyril-babu.onemoredevs.com",
    siteName: "Cyril Babu's Blog",
    images: [{ url: "/cyril.jpg", width: 800, height: 600 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyril Babu's Blog",
    description: "Follow Cyril's blogs on React, Next.js, and coding projects.",
    images: ["/cyril-removebg.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen w-full">
      {/* Google Analytics Script */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-M88PN6G6G3"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-M88PN6G6G3');
        `}
      </Script>

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
