"use client";

import React, { useEffect, useState } from "react";
import Flow from "../../Flow";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/app/layout";
import { getRoadmapById } from "@/app/(user)/roadmap-api";
import Loading from "@/components/Loading";

export default function EditPage() {
  const { me, loading: userLoading } = useUser();
  const params = useParams();
  const router = useRouter();
  const roadmapId = params.flowId as string;

  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        if (!roadmapId || userLoading) return;

        const res = await getRoadmapById(roadmapId);

        if (res == null) {
          router.push("/profile");
          return;
        }

        setRoadmap(res);
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
    <div className="w-full h-full">
      <Flow
        isEdit={true}
        roadmapId={roadmapId}
        initialData={roadmap}
      />
    </div>
  );
}
