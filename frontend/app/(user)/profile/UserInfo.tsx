"use client";

import React from "react";
import SignOut from "@/components/Signout";
import { Roadmap } from "../type";
import { api } from "@/api";

interface Props {
  me: any;
  setEditing: React.Dispatch<React.SetStateAction<Roadmap | null>>;
}

export default function UserInfo({ me, setEditing }: Props) {
  const createRoadmap = async () => {
    try {
      const payload = {
        title: "New Roadmap",
        description: "Describe this roadmap...",
        roadmap_data: {},
        is_public: false,
      };
      const res = await api.post("/roadmaps/", payload);
      if (res.data.success) {
        setEditing(res.data.data);
      }
    } catch (err: any) {
      console.error("Failed to create roadmap", err);
      alert(err.response?.data?.detail || "Failed to create roadmap");
    }
  };

  return (
    <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>
        <div className="text-xs sm:text-sm text-zinc-400">
          Member since{" "}
          {me?.created_at
            ? new Date(me.created_at).toLocaleDateString()
            : "Invalid Date"}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div>
          <div className="text-base sm:text-lg font-medium">{me?.name}</div>
          <div className="text-xs sm:text-sm text-zinc-400">{me?.email}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={createRoadmap}
            className="px-3 sm:px-4 py-1.5 sm:py-2 border border-green-500 text-xs sm:text-sm text-green-400 rounded-md hover:bg-green-500/10 transition"
          >
            + New Roadmap
          </button>
          <SignOut />
        </div>
      </div>
    </section>
  );
}
