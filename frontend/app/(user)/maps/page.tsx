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
<div className="bg-[#2f3131] min-h-[calc(100vh-104px)] text-zinc-200 font-mono flex flex-col items-center">
  <div className="container w-full py-8 sm:py-12 px-4 sm:px-6 flex flex-col gap-6 sm:gap-8">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <h1 className="text-xl sm:text-2xl font-semibold">🌍 All Roadmaps</h1>
      <input
        type="text"
        placeholder="Search maps..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500 w-full sm:w-auto"
      />
    </div>

    {/* Maps Grid */}
    {loading ? (
      <div className="text-gray-400 text-center text-sm sm:text-base">Loading...</div>
    ) : filteredMaps.length === 0 ? (
      <div className="text-zinc-400 text-center text-sm sm:text-base">No maps found.</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {filteredMaps.map((map) => (
          <div
            key={map.id}
            className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-blue-500/50 hover:scale-[1.02] transition duration-200"
          >
            <div>
              <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{map.title}</h2>
              <p className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">{map.description}</p>
              <div className="text-[10px] sm:text-xs text-zinc-500">
                metaID: <span className="text-zinc-300">{map.id}</span>
              </div>
            </div>

            <div className="flex justify-between mt-3 sm:mt-4">
              <button
                onClick={() => toggleEnroll(map.id)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 border rounded-md transition text-xs sm:text-sm ${
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
