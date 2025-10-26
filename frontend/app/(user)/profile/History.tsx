"use client";

import React from "react";
import Link from "next/link";
import { HistoryType } from "../type";

interface Props {
  history: HistoryType[];
  setUnenrollTarget: React.Dispatch<React.SetStateAction<HistoryType | null>>;
}

export default function History({ history, setUnenrollTarget }: Props) {
  return (
    <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">📜 Your Roadmap History</h2>
      {!history ? (
        <div className="text-zinc-400">No history yet.</div>
      ) : (
        <div className="space-y-3">
          {history.map((h) => (
            <div
              key={h.id}
              className="bg-zinc-900/30 rounded-md p-3 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2"
            >
              <div>
                <div className="font-medium">{h.roadmap_title}</div>
                <div className="text-sm text-zinc-400">{h.roadmap_description}</div>
                <div className="text-xs text-zinc-500 mt-1">
                  Enrolled at: {new Date(h.enrolled_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`view/${h.roadmap_id}`}
                  className="px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                >
                  View
                </Link>
                <button
                  onClick={() => setUnenrollTarget(h)}
                  className="px-3 py-1 border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
                >
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
