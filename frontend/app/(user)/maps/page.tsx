"use client";
import { useState, useEffect } from "react";
import { getRoadmaps } from "../roadmap-api";
import { getHistory } from "../history-api";
import { api } from "@/api";
import { Roadmap, HistoryType } from "../type"; 

export default function MapsPage() {
  const [search, setSearch] = useState("");
  const [maps, setMaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const roadmaps = await getRoadmaps();
        const history: HistoryType[] = await getHistory();

        if (roadmaps && Array.isArray(roadmaps)) {
          const mapped: Roadmap[] = roadmaps.map((map: Roadmap) => ({
            ...map,
            enrolled: !!history?.find((h) => h.roadmap_id === map.id),
          }));
          setMaps(mapped);
        }
      } catch (err) {
        console.error("Failed to load maps:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleEnroll = async (mapId: string) => {
    const map = maps.find((m) => m.id === mapId);
    if (!map) return;

    if (!map.enrolled) {
      try {
        const res = await api.post("/history", { roadmap_id: mapId });
        if (res.data.success) {
          setMaps((prev) =>
            prev.map((m) =>
              m.id === mapId ? { ...m, enrolled: true } : m
            )
          );
        }
      } catch (e) {
        console.error("Failed to enroll:", e);
      }
    } else {
      try {
        const history: HistoryType[] = await getHistory();
        const record = history?.find((h) => h.roadmap_id === mapId);
        if (record) {
          const res = await api.delete(`/history/${record.id}`);
          if (res.data.success) {
            setMaps((prev) =>
              prev.map((m) =>
                m.id === mapId ? { ...m, enrolled: false } : m
              )
            );
          }
        }
      } catch (e) {
        console.error("Failed to unenroll:", e);
      }
    }
  };

  const filteredMaps = maps.filter((map) =>
    map.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#2f3131] min-h-[calc(100vh-56px)] text-zinc-200 font-mono flex flex-col items-center">
      <div className="container w-full py-12 px-4 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">🌍 All Roadmaps</h1>
          <input
            type="text"
            placeholder="Search maps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Maps Grid */}
        {loading ? (
          <div className="text-gray-400 text-center">Loading...</div>
        ) : filteredMaps.length === 0 ? (
          <div className="text-zinc-400 text-center">No maps found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaps.map((map) => (
              <div
                key={map.id}
                className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 flex flex-col justify-between hover:border-blue-500/50 hover:scale-[1.02] transition duration-200"
              >
                <div>
                  <h2 className="text-lg font-semibold mb-2">{map.title}</h2>
                  <p className="text-sm text-zinc-400 mb-3">{map.description}</p>
                  <div className="text-xs text-zinc-500">
                    metaID: <span className="text-zinc-300">{map.id}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => toggleEnroll(map.id)}
                    className={`px-3 py-1 border rounded-md transition ${
                      map.enrolled
                        ? "border-red-500 text-red-300 hover:bg-red-500/10"
                        : "border-green-500 text-green-300 hover:bg-green-500/10"
                    }`}
                  >
                    {map.enrolled ? "Unenroll" : "Enroll"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
