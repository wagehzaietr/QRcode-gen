import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-6 mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-4">
        <div>
          &copy; {new Date().getFullYear()} RapidQR. All rights reserved.
        </div>
        <div className="flex gap-4 items-center justify-center">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms</a>
          {/* Social icons placeholder */}
        </div>
      </div>
    </footer>
  );
} 