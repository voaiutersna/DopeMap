import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-104px)] bg-[#1a1b1c]">
      <span className="text-white text-xl font-mono animate-pulse">
        Loading …
      </span>
    </div>
  );
}
