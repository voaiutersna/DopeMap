"use client";

import React from "react";
import { Roadmap } from "../../type";
import { api } from "@/api";

interface Props {
  editing: Roadmap;
  setEditing: React.Dispatch<React.SetStateAction<Roadmap | null>>;
}

export default function EditRoadmapModal({ editing, setEditing }: Props) {
  const saveEdit = async () => {
    try {
      const payload = {
        title: editing.title,
        description: editing.description,
        is_public: editing.is_public,
      };
      const res = await api.put(`/roadmaps/${editing.id}`, payload);
      if (res.data.success) {
        setEditing(null);
      }
    } catch (err: any) {
      console.error("Failed to update roadmap", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-lg z-10">
        <h3 className="text-lg font-semibold mb-3">Edit Roadmap</h3>
        <label className="flex flex-col mb-3">
          <span className="text-sm text-zinc-400 mb-1">Title</span>
          <input
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2"
          />
        </label>
        <label className="flex flex-col mb-3">
          <span className="text-sm text-zinc-400 mb-1">Description</span>
          <textarea
            value={editing.description}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 h-24"
          />
        </label>
        <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={editing.is_public}
              onChange={(e) =>
                setEditing({ ...editing, is_public: e.target.checked })
              }
              className="sr-only"
            />
            <div
              className={`w-10 h-5 rounded-full transition-colors ${
                editing.is_public ? "bg-blue-500" : "bg-zinc-700"
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-zinc-100 rounded-full shadow-md transform transition-transform ${
                editing.is_public ? "translate-x-5" : ""
              }`}
            />
          </div>
          <span className="text-sm text-zinc-400">Public</span>
        </label>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditing(null)}
            className="px-3 py-2 border border-zinc-600 hover:bg-gray-500/10 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={saveEdit}
            className="px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
