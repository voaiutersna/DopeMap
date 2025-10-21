"use client";
import React, { useState } from "react";

type Roadmap = {
  id: string;
  title: string;
  description: string;
  authorId: number;
  enrolled: boolean;
  createdAt: string;
};

const makeId = (n = 6) =>
  Math.random().toString(36).substring(2, 2 + n) + Date.now().toString(36).slice(-3);

export default function ProfilePage() {
  const [user] = useState({
    id: 1,
    name: "Jane Developer",
    email: "jane@example.com",
    created_at: new Date().toISOString(),
  });

  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([
    {
      id: makeId(),
      title: "Frontend Fundamentals",
      description: "Learn HTML, CSS, and JS from scratch.",
      authorId: 1,
      enrolled: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: makeId(),
      title: "React Deep Dive",
      description: "Hooks, context, and advanced patterns.",
      authorId: 2,
      enrolled: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: makeId(),
      title: "Backend Basics",
      description: "APIs, databases, and authentication.",
      authorId: 1,
      enrolled: true,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [editing, setEditing] = useState<Roadmap | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const yourRoadmaps = roadmaps.filter((r) => r.authorId === user.id);
  const enrolledRoadmaps = roadmaps.filter((r) => r.enrolled && r.authorId !== user.id);

  function createRoadmap() {
    const newRoadmap: Roadmap = {
      id: makeId(),
      title: "New Roadmap",
      description: "Describe this roadmap...",
      authorId: user.id,
      enrolled: false,
      createdAt: new Date().toISOString(),
    };
    setRoadmaps((prev) => [newRoadmap, ...prev]);
    setEditing(newRoadmap);
  }

  function toggleEnroll(id: string) {
    setRoadmaps((prev) => prev.map((r) => (r.id === id ? { ...r, enrolled: !r.enrolled } : r)));
  }

  function startEdit(r: Roadmap) {
    setEditing({ ...r });
  }

  function saveEdit() {
    if (!editing) return;
    setRoadmaps((prev) => prev.map((r) => (r.id === editing.id ? editing : r)));
    setEditing(null);
  }

  function cancelEdit() {
    setEditing(null);
    setConfirmDeleteId(null);
  }

  function requestDelete(id: string) {
    setConfirmDeleteId(id);
  }

  function confirmDelete() {
    if (!confirmDeleteId) return;
    setRoadmaps((prev) => prev.filter((r) => r.id !== confirmDeleteId));
    setConfirmDeleteId(null);
    if (editing?.id === confirmDeleteId) setEditing(null);
  }

  function doIt(id: string) {
    const roadmap = roadmaps.find((r) => r.id === id);
    if (roadmap) alert(`Starting roadmap: ${roadmap.title}`);
  }

  return (
    <div className="bg-[#2f3131] flex flex-col items-center min-h-[calc(100vh-56px)] font-mono text-zinc-200">
      <div className="container  w-full flex flex-col py-12 space-y-8">
        {/* --- USER INFO --- */}
        <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="text-sm text-zinc-400">
              Member since {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-medium">{user.name}</div>
              <div className="text-sm text-zinc-400">{user.email}</div>
            </div>

            <button
              onClick={createRoadmap}
              className="px-4 py-2 border border-green-500 text-green-400 rounded-md hover:bg-green-500/10 transition"
            >
              + New Roadmap
            </button>
          </div>
        </section>

        {/* --- YOUR ROADMAPS --- */}
        <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">🧭 Your Roadmaps</h2>

          {yourRoadmaps.length === 0 ? (
            <div className="text-zinc-400">You haven’t created any roadmaps yet.</div>
          ) : (
            <div className="space-y-3">
              {yourRoadmaps.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/30 rounded-md p-3 gap-3"
                >
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-zinc-400">{r.description}</div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Created: {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => startEdit(r)}
                      className="px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => requestDelete(r.id)}
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

        {/* --- ENROLLED ROADMAPS --- */}
        <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">📚 Enrolled Roadmaps</h2>

          {enrolledRoadmaps.length === 0 ? (
            <div className="text-zinc-400">You are not enrolled in any roadmaps.</div>
          ) : (
            <div className="space-y-3">
              {enrolledRoadmaps.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/30 rounded-md p-3 gap-3"
                >
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-zinc-400">{r.description}</div>
                    <div className="text-xs text-zinc-500 mt-1">
                      By author #{r.authorId}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => doIt(r.id)}
                      className="px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10"
                    >
                      View
                    </button>
                    <button
                      onClick={() => toggleEnroll(r.id)}
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
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2"
              />
            </label>
            <label className="flex flex-col mb-4">
              <span className="text-sm text-zinc-400 mb-1">Description</span>
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 h-24"
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelEdit}
                className="px-3 py-2 border border-zinc-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-3 py-2 border border-blue-500 text-blue-300 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRM --- */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setConfirmDeleteId(null)} />
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-md z-10">
            <h3 className="text-lg font-semibold mb-3 text-red-300">
              Confirm Delete
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Are you sure you want to delete this roadmap? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-3 py-2 border border-zinc-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-2 border border-red-500 text-red-300 rounded-md"
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
