"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../layout";
import { api } from "@/api";
import Link from "next/link";
import { getRoadmaps } from "../roadmap-api";
import { getHistory } from "../history-api";

type Roadmap = {
  id: string;
  title: string;
  description: string;
  authorId: number;
  enrolled: boolean;
  created_at: string;
  is_public: boolean;
};

type History = {
  id: string;
  roadmap_id: string;
  roadmap_title: string;
  roadmap_description: string;
  enrolled_at: string;
};

export default function ProfilePage() {
  const { me, loading } = useUser();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [editing, setEditing] = useState<Roadmap | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Roadmap | null>(null); // <-- for delete modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roadmap = await getRoadmaps();
        setRoadmaps(roadmap);

        const history = await getHistory();
        setHistory(history);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading) fetchData();
  }, [loading]);

  if (loading || loadingData) return <div>Loading...</div>;

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
        setRoadmaps((prev) => [res.data.data, ...prev]);
        setEditing(res.data.data);
      }
    } catch (err: any) {
      console.error("Failed to create roadmap", err);
      alert(err.response?.data?.detail || "Failed to create roadmap");
    }
  };

  const saveEdit = async () => {
    if (!editing) return;
    try {
      const payload = {
        title: editing.title,
        description: editing.description,
        is_public: editing.is_public,
      };
      const res = await api.put(`/roadmaps/${editing.id}`, payload);
      if (res.data.success) {
        setRoadmaps((prev) =>
          prev.map((r) => (r.id === editing.id ? res.data.data : r))
        );
        setEditing(null);
      }
    } catch (err: any) {
      console.error("Failed to update roadmap", err);
    }
  };

  const cancelEdit = () => setEditing(null);

  const confirmDeleteRoadmap = async () => {
    if (!deleteTarget) return;
    try {
      const res = await api.delete(`/roadmaps/${deleteTarget.id}`);
      if (res.data.success) {
        setRoadmaps((prev) =>
          prev.filter((r) => r.id !== deleteTarget.id)
        );
        if (editing?.id === deleteTarget.id) setEditing(null);
        setDeleteTarget(null);
      }
    } catch (err: any) {
      console.error("Failed to delete roadmap", err);
      setDeleteTarget(null);
    }
  };

  const unEnrollRoadmap = async (id: string) => {
    if (!confirm("Are you sure you want to unenroll?")) return;
    try {
      const res = await api.delete(`/roadmap-history/${id}`);
      if (res.data.success) {
        setHistory((prev) => prev.filter((h) => h.id !== id));
      }
    } catch (err: any) {
      console.error("Unenroll failed", err);
    }
  };

  return (
    <div className="bg-[#2f3131] flex flex-col items-center min-h-[calc(100vh-56px)] font-mono text-zinc-200">
      <div className="container w-full flex flex-col py-12 space-y-8">
        {/* --- USER INFO --- */}
        <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="text-sm text-zinc-400">
              Member since {me?.created_at ? new Date(me?.created_at).toLocaleDateString() : "Invalid Date"}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-medium">{me?.name}</div>
              <div className="text-sm text-zinc-400">{me?.email}</div>
            </div>
            <button
              onClick={createRoadmap}
              className="px-4 py-2 border border-green-500 text-green-400 rounded-md hover:bg-green-500/10 transition"
            >
              + New Roadmap
            </button>
          </div>
        </section>

        {/* --- USER ROADMAPS --- */}
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
                      className=" cursor-pointer px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                    >
                      Edit RoadMap
                    </Link>
                    <button
                      onClick={() => setEditing(r)}
                      className=" cursor-pointer px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(r)}
                      className="cursor-pointer px-3 py-1 border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- HISTORY --- */}
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
                      onClick={() => unEnrollRoadmap(h.id)}
                      className="cursor-pointer px-3 py-1 border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
                    >
                      Unenroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* --- EDIT MODAL --- */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={cancelEdit} />
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-lg z-10">
            <h3 className="text-lg font-semibold mb-3">Edit Roadmap</h3>
            <label className="flex flex-col mb-3">
              <span className="text-sm text-zinc-400 mb-1">Title</span>
              <input
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
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
                onClick={cancelEdit}
                className="cursor-pointer px-3 py-2 border border-zinc-600 hover:bg-gray-500/10 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="cursor-pointer px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDeleteTarget(null)}
          />
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-sm z-10">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6 text-zinc-400">
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
                onClick={confirmDeleteRoadmap}
                className="px-3 py-2 border border-red-500 text-red-300 rounded-md hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
