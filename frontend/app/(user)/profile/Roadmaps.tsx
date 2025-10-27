"use client";

import React from "react";
import Link from "next/link";
import { Roadmap } from "../type";

interface Props {
  roadmaps: Roadmap[];
  setEditing: React.Dispatch<React.SetStateAction<Roadmap | null>>;
  setDeleteTarget: React.Dispatch<React.SetStateAction<Roadmap | null>>;
}

export default function Roadmaps({ roadmaps, setEditing, setDeleteTarget }: Props) {
  return (
    <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">🧭 Your Roadmaps</h2>
      {roadmaps.length === 0 ? (
        <div className="text-xs sm:text-sm text-zinc-400">
          You haven’t created any roadmaps yet.
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {roadmaps.map((r) => (
            <div
              key={r.id}
              className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/30 rounded-md p-2 sm:p-3 gap-2 sm:gap-3"
            >
              <div>
                <div className="font-medium text-sm sm:text-base">{r.title}</div>
                <div className="text-xs sm:text-sm text-zinc-400">{r.description}</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                  Created: {new Date(r.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 md:mt-0">
                <Link
                  href={`/edit/${r.id}`}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                >
                  Edit RoadMap
                </Link>
                <button
                  onClick={() => setEditing(r)}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(r)}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
