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
    <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">🧭 Your Roadmaps</h2>
      {roadmaps.length === 0 ? (
        <div className="text-zinc-400">You haven’t created any roadmaps yet.</div>
      ) : (
        <div className="space-y-3">
          {roadmaps.map((r) => (
            <div
              key={r.id}
              className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/30 rounded-md p-3 gap-3"
            >
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-sm text-zinc-400">{r.description}</div>
                <div className="text-xs text-zinc-500 mt-1">
                  Created: {new Date(r.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/edit/${r.id}`}
                  className="px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                >
                  Edit RoadMap
                </Link>
                <button
                  onClick={() => setEditing(r)}
                  className="px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(r)}
                  className="px-3 py-1 border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
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
