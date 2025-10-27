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
    <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">📜 Your Roadmap History</h2>
      {history.length === 0 ? (
        <div className="text-xs sm:text-sm text-zinc-400">No history yet.</div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {history.map((h) => (
            <div
              key={h.id}
              className="bg-zinc-900/30 rounded-md p-2 sm:p-3 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2"
            >
              <div>
                <div className="font-medium text-sm sm:text-base">{h.roadmap_title}</div>
                <div className="text-xs sm:text-sm text-zinc-400">{h.roadmap_description}</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                  Enrolled at: {new Date(h.enrolled_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 md:mt-0">
                <Link
                  href={`view/${h.roadmap_id}`}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                >
                  View
                </Link>
                <button
                  onClick={() => setUnenrollTarget(h)}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
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
