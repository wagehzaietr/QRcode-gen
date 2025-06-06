import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Generate from "@/pages/Generate";
import About from "@/pages/About";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <HelmetProvider>
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-900 transition-colors duration-300">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<Generate darkMode={darkMode} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}
