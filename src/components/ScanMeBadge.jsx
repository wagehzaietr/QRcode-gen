import React from "react";

export default function ScanMeBadge() {
  return (
    <div className="flex flex-col items-center mt-2">
      <span className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow animate-bounce mb-1">
        Scan Me
      </span>
      <svg width="32" height="8" viewBox="0 0 32 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="4" rx="16" ry="4" fill="#2563eb" fillOpacity="0.15" />
      </svg>
    </div>
  );
} 