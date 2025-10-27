"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/layout";
import Loading from "@/components/Loading";
import { getRoadmaps } from "../roadmap-api";
import { getHistory } from "../history-api";
import UserInfo from "./UserInfo";
import Roadmaps from "./Roadmaps";
import History from "./History";
import EditRoadmapModal from "./modals/EditRoadmapModal";
import DeleteRoadmapModal from "./modals/DeleteRoadmapModal";
import UnenrollModal from "./modals/UnenrollModal";
import { HistoryType, Roadmap } from "../type";

export default function ProfilePage() {
  const { me, loading } = useUser();

  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [editing, setEditing] = useState<Roadmap | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Roadmap | null>(null);
  const [unenrollTarget, setUnenrollTarget] = useState<HistoryType | null>(
    null
  );

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

  const updateRoadmapInState = (updated: Roadmap) => {
  setRoadmaps((prev) =>
    prev.map((r) => (r.id === updated.id ? updated : r))
  );
};


  if (loading || loadingData) return <Loading />;

  return (
    <div className="bg-[#2f3131] flex flex-col items-center min-h-[calc(100vh-104px)] font-mono text-zinc-200">
      <div className="container w-full flex flex-col py-12 space-y-8">
        <UserInfo me={me} setEditing={setEditing}   addRoadmap={(newRoadmap) =>
    setRoadmaps((prev) => [newRoadmap, ...prev])
  }/>
        <Roadmaps
          roadmaps={roadmaps}
          setEditing={setEditing}
          setDeleteTarget={setDeleteTarget}
        />
        <History history={history} setUnenrollTarget={setUnenrollTarget} />
      </div>

      {/* MODALS  */}
      {editing && (
        <EditRoadmapModal editing={editing} setEditing={setEditing} updateRoadmapInState={updateRoadmapInState}/>
      )}
      {deleteTarget && (
        <DeleteRoadmapModal
          deleteTarget={deleteTarget}
          setDeleteTarget={setDeleteTarget}
          removeFromRoadmaps={(id) =>
            setRoadmaps((prev) => prev.filter((r) => r.id !== id))
          }
        />
      )}
      {unenrollTarget && (
        <UnenrollModal
          unenrollTarget={unenrollTarget}
          setUnenrollTarget={setUnenrollTarget}
          removeFromHistory={(id) =>
            setHistory((prev) => prev.filter((h) => h.id !== id))
          }
        />
      )}
    </div>
  );
}
