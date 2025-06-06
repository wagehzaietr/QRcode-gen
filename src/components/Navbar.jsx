import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/generate", label: "Generate" },
    { to: "/about", label: "About" },
  ];
  return (
    <nav className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary dark:text-white">
        <img src="/logo1.jpg" alt="Logo" className="w-8 h-8 rounded" loading="lazy" />
        RapidQR
      </Link>
      <div className="flex items-center gap-6">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-base font-medium transition-colors ${location.pathname === link.to ? "text-primary dark:text-white" : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"}`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={toggleDarkMode}
          className="ml-2 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
} 