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
    <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="text-sm text-zinc-400">
          Member since {me?.created_at ? new Date(me.created_at).toLocaleDateString() : "Invalid Date"}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-medium">{me?.name}</div>
          <div className="text-sm text-zinc-400">{me?.email}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={createRoadmap}
            className="px-4 py-2 border border-green-500 text-green-400 rounded-md hover:bg-green-500/10 transition"
          >
            + New Roadmap
          </button>
          <SignOut />
        </div>
      </div>
    </section>
  );
}
