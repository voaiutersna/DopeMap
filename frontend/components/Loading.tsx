import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1b1c]">
      <span className="text-white text-xl font-mono animate-pulse">
        Loading …
      </span>
    </div>
  );
}
