import React from "react";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About RapidQR | Free QR Code Generator</title>
        <meta name="description" content="Learn about RapidQR, a free and modern QR code generator for business, events, and personal use. No sign-up required." />
        <meta property="og:title" content="About RapidQR | Free QR Code Generator" />
        <meta property="og:description" content="Learn about RapidQR, a free and modern QR code generator for business, events, and personal use. No sign-up required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:image" content="/logo1.jpg" />
      </Helmet>
      <section className="max-w-2xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About RapidQR</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          RapidQR is a free, modern QR code generator that lets you create, customize, and download QR codes for any URL. No sign-up required. Perfect for business cards, flyers, events, and more.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">What is a QR Code?</h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A QR code (Quick Response code) is a type of barcode that can store URLs and other information. Scanning a QR code with your phone camera instantly opens the link or content.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">How to Use</h3>
        <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
          <li>Enter your URL on the Generate page.</li>
          <li>Customize your QR code with colors, size, and more.</li>
          <li>Download or share your QR code instantly.</li>
        </ul>
        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">FAQ</h3>
        <ul className="mb-6 text-gray-700 dark:text-gray-300">
          <li className="mb-2"><b>Is this free?</b> Yes, RapidQR is 100% free to use.</li>
          <li className="mb-2"><b>Do QR codes expire?</b> No, static QR codes never expire.</li>
          <li className="mb-2"><b>Can I use these for business?</b> Absolutely! Print them on cards, flyers, menus, and more.</li>
          <li className="mb-2"><b>Is my data safe?</b> Yes, we do not store your URLs or QR codes.</li>
        </ul>
      </section>
    </>
  );
} 