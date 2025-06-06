import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Free QR Code Generator | RapidQR</title>
        <meta name="description" content="Create free, customizable QR codes for any URL. Download, share, and brand your QR codes instantly. No sign-up required." />
        <meta property="og:title" content="Free QR Code Generator | RapidQR" />
        <meta property="og:description" content="Create free, customizable QR codes for any URL. Download, share, and brand your QR codes instantly. No sign-up required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="/logo1.jpg" />
      </Helmet>
      <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 px-4 py-16">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white drop-shadow-lg">
            Instantly Create <span className="text-blue-600 dark:text-blue-400">QR Codes</span> for Any URL
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Free, fast, and customizable QR code generator. Download, share, and brand your QR codes with ease. No sign-up required.
          </p>
          <Link
            to="/generate"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-200"
          >
            Generate QR Code
          </Link>
        </div>
      </section>
    </>
  );
} 