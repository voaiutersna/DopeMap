"use client";

import React, { useEffect, useState } from "react";
import Flow from "../../Flow";
import { useParams } from "next/navigation";
import { useUser } from "@/app/(user)/layout";
import { getRoadmapById } from "@/app/(user)/roadmap-api";
import ViewSidebar from "./ViewSideBar";

export default function ViewPage() {
  const { me, loading: userLoading } = useUser();
  const params = useParams();
  const roadmapId = params.flowId as string;

  const [roadmap, setRoadmap] = useState<any>(null);
  const [history , setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        if (!roadmapId || userLoading) return;

        const res = await getRoadmapById(roadmapId);
        const roadmapData = res

        setRoadmap(roadmapData);
      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [roadmapId, userLoading]);

  if (userLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen text-zinc-400">
        Loading roadmap...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        Roadmap not found.
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      <div className="flex-1">
        <Flow isEdit={false} roadmapId={roadmapId} initialData={roadmap}  />
      </div>
    </div>
  );
}
