"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../layout";
import { getRoadmaps } from "../roadmap-api";
import { getHistory } from "../history-api";

type Roadmap = {
  id: string;
  title: string;
  description: string;
  authorId: number;
  enrolled: boolean;
  createdAt: string;
};

type HistoryItem = {
  id: string;
  roadmap_id: string;
  roadmap_title: string;
  roadmap_description: string;
  enrolled_at: string;
  task_history: Record<string, any>;
};

export default function ProfilePage() {
  const { me, loading } = useUser();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Fetch roadmaps and history from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const roadmapData = await getRoadmaps();
        const historyData = await getHistory();
        setRoadmaps(roadmapData);
        setHistory(historyData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading) fetchData();
  }, [loading]);

  if (loading || loadingData) return <div>Loading...</div>;

  // Create a new roadmap (temporary UI state only)
  function createRoadmap() {
    const newRoadmap: Roadmap = {
      id: `temp-${Date.now()}`,
      title: "New Roadmap",
      description: "Describe this roadmap...",
      enrolled: false,
      authorId: me.id,
      createdAt: new Date().toISOString(),
    };
    setRoadmaps((prev) => [newRoadmap, ...prev]);
  }

  return (
    <div className="bg-[#2f3131] flex flex-col items-center min-h-[calc(100vh-56px)] font-mono text-zinc-200">
      <div className="container w-full flex flex-col py-12 space-y-8">
        {/* --- USER INFO --- */}
        <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="text-sm text-zinc-400">
              Member since {new Date(me?.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-medium">{me.name}</div>
              <div className="text-sm text-zinc-400">{me.email}</div>
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
                      Created: {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- HISTORY --- */}
        <section className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">📜 Your Roadmap History</h2>
          {history == null ? (
            <div className="text-zinc-400">No history yet.</div>
          ) : (
            <div className="space-y-3">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="bg-zinc-900/30 rounded-md p-3"
                >
                  <div className="font-medium">{h.roadmap_title}</div>
                  <div className="text-sm text-zinc-400">{h.roadmap_description}</div>
                  <div className="text-xs text-zinc-500 mt-1">
                    Enrolled at: {new Date(h.enrolled_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
