"use client";

import React from "react";
import { Roadmap } from "../../type";
import { api } from "@/api";
import Toaster from "@/components/Toaster";
import { toast } from "react-toastify";

interface Props {
  deleteTarget: Roadmap;
  setDeleteTarget: React.Dispatch<React.SetStateAction<Roadmap | null>>;
  removeFromRoadmaps: (id: string) => void; // <-- new prop
}

export default function DeleteRoadmapModal({ deleteTarget, setDeleteTarget, removeFromRoadmaps }: Props) {
  const handleDelete = async () => {
    try {
      const res = await api.delete(`/roadmaps/${deleteTarget.id}`);
      if (res.data.success) {
        removeFromRoadmaps(deleteTarget.id);
        setDeleteTarget(null);
      }
    } catch (err: any) {
      console.error("Failed to delete roadmap", err);
      toast.error(err.response?.data?.detail || "Failed to delete roadmap");
    }
  };

  return (
    <>
    <Toaster/>
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => setDeleteTarget(null)} />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-sm z-10">
        <h3 className="text-lg font-semibold mb-4 text-red-400">Delete Roadmap</h3>
        <p className="text-zinc-300 mb-6">
          Are you sure you want to delete <strong>{deleteTarget.title}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleteTarget(null)}
            className="px-3 py-2 border border-zinc-600 hover:bg-gray-500/10 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
