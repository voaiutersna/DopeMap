"use client";
import React, { useState } from "react";

type MapItem = {
  id: string;
  title: string;
  description: string;
  author: string;
  enrolled: boolean;
  createdAt: string;
};

export default function MapsPage() {
  const [search, setSearch] = useState("");

  // 🧩 Fake data
  const [maps, setMaps] = useState<MapItem[]>([
    {
      id: "1",
      title: "Frontend Fundamentals",
      description: "Learn HTML, CSS, and JavaScript basics.",
      author: "Jane Developer",
      enrolled: false,
      createdAt: "2024-09-12",
    },
    {
      id: "2",
      title: "React Advanced Guide",
      description: "Hooks, Context API, and performance optimization.",
      author: "John Coder",
      enrolled: true,
      createdAt: "2024-10-01",
    },
    {
      id: "3",
      title: "Backend API Design",
      description: "Learn to build and secure RESTful APIs.",
      author: "Sam Engineer",
      enrolled: false,
      createdAt: "2024-08-20",
    },
  ]);

  const filteredMaps = maps.filter((map) =>
    map.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleEnroll = (id: string) => {
    setMaps((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, enrolled: !m.enrolled } : m
      )
    );
  };

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

        {/* Map list */}
        {filteredMaps.length === 0 ? (
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
                    Author: <span className="text-zinc-300">{map.author}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => alert(`Viewing: ${map.title}`)}
                    className="px-3 py-1 border border-blue-500 text-blue-300 rounded-md hover:bg-blue-500/10 transition"
                  >
                    View
                  </button>

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
