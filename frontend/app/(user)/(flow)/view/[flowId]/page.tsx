"use client";

import React, { useEffect, useState } from "react";
import Flow from "../../Flow";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/app/layout";
import { getRoadmapById } from "@/app/(user)/roadmap-api";
import Loading from "@/components/Loading";
import { HistoryType, Roadmap } from "@/app/(user)/type";
import { getHistory, getHistoryById, getHistoryByRoadmapId } from "@/app/(user)/history-api";

export default function ViewPage() {
  const { me, loading: userLoading } = useUser();
  const params = useParams();
  const router = useRouter();
  const roadmapId = params.flowId as string;

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [history, setHistory] = useState<HistoryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        if (!roadmapId || userLoading) return;

        const rm = await getRoadmapById(roadmapId);
        const h = await getHistoryByRoadmapId(roadmapId);

        if (rm == null || h == null) {
          router.push("/profile");
          return;
        }

        setRoadmap(rm);
        setHistory(h);
      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
        router.push("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [roadmapId, userLoading, router]);

  if (userLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full h-full">
      <div className="flex-1">
        <Flow isEdit={false} roadmapId={roadmapId} initialData={roadmap} historyData={history}/>
      </div>
    </div>
  );
}
