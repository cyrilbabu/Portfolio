// app/layout.js
import "./globals.css";
import ContactMe from "./(components)/contact-me";
import Navbar from "./(components)/Navbar";
import Head from "next/head";
import Script from "next/script";

export const metadata = {
  title: "Cyril Babu's Blog",
  description: "Cyril Babu's personal blog site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen w-full">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Cyril Babu's personal blog site" />
        <meta
          name="keywords"
          content="Cyril Babu, Blogs, Personal Blog, Web Development"
        />
        <meta name="robots" content="noindex"></meta>
        <meta name="author" content="Cyril Babu" />
        <meta name="theme-color" content="#131628" />
        <link rel="icon" href="/cyril.jpg" />
        <link rel="apple-touch-icon" href="/cyril.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

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
