"use client";

import React from "react";
import { HistoryType } from "../../type";
import { api } from "@/api";
import Toaster from "@/components/Toaster";
import { toast } from "react-toastify";

interface Props {
  unenrollTarget: HistoryType;
  setUnenrollTarget: React.Dispatch<React.SetStateAction<HistoryType | null>>;
  removeFromHistory: (id: string) => void;
}

export default function UnenrollModal({
  unenrollTarget,
  setUnenrollTarget,
  removeFromHistory,
}: Props) {
  const handleUnenroll = async () => {
    try {
      const res = await api.delete(`/history/${unenrollTarget.id}`);
      if (res.data.success) {
        removeFromHistory(unenrollTarget.id);
        setUnenrollTarget(null);
      }
    } catch (err: unknown) {
      console.error("err", err);

      if (err instanceof Error) {
        toast.error(err.message || "Failed to unenroll roadmap");
      } else {
        toast.error("Failed to unenroll roadmap");
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setUnenrollTarget(null)}
        />
        <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-sm z-10">
          <h3 className="text-lg font-semibold mb-4 text-red-400">
            Unenroll Roadmap
          </h3>
          <p className="text-zinc-300 mb-6">
            Do you want to unenroll from{" "}
            <span className="font-semibold">
              {unenrollTarget.roadmap_title}
            </span>
            ?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setUnenrollTarget(null)}
              className="px-3 py-2 border border-zinc-600 hover:bg-gray-500/10 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleUnenroll}
              className="px-3 py-2 border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
            >
              Unenroll
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
