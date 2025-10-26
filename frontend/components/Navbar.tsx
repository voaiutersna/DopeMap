"use client";
import React from "react";
import { LogIn, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/layout";

export default function Navbar() {
  const router = useRouter();
  const { me, loading } = useUser();

  const textColor = "text-zinc-200";

  return (
    <div className="h-14 bg-[#161616] w-full border-b border-[#3a3d3f] flex justify-center items-center z-50 font-mono">
      <div className="container flex justify-between items-center">
        {/* Left: Logo + Nav Links */}
        <div className="flex space-x-6 items-center">
          <h1
            className={`text-lg font-bold cursor-pointer ${textColor}`}
            onClick={() => router.push("/")}
          >
            DopeMap
          </h1>
          <p
            className={`cursor-pointer ${textColor}`}
            onClick={() => router.push("/")}
          >
            About
          </p>

          {/* Show "Roadmaps" link only if logged in */}
          {me && (
            <p
              className={`cursor-pointer ${textColor}`}
              onClick={() => router.push("/maps")}
            >
              Roadmaps
            </p>
          )}
        </div>

        {/* Right: User */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <span className={`${textColor} text-sm`}>Loading...</span>
          ) : me ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              <User className={`w-4 h-4 ${textColor}`} />
              <span className={`text-sm ${textColor}`}>{me.name}</span>
            </div>
          ) : (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              <LogIn className={`w-4 h-4 ${textColor}`} />
              <span className={`text-sm ${textColor}`}>Sign In</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
