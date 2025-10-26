"use client";
import React, { useRef } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Trash2,
  Save,
  Upload,
  Database,
} from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { api } from "@/api";
import Toaster from "@/components/Toaster";
import { toast } from "react-toastify";

export default function Toolbar({
  roadmapId,
  initialData,
}: {
  roadmapId: string;
  initialData: any;
}) {
  const { zoomIn, zoomOut, fitView, setNodes, setEdges, getNodes, getEdges } =
    useReactFlow();
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    toast.info("All nodes cleared.", { theme: "dark" });
  };

  const handleSaveJSON = () => {
    const data = { nodes: getNodes(), edges: getEdges() };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flow.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Flow exported as JSON.");
  };

  const handleSaveRoadmap = async () => {
    const roadmapData = { nodes: getNodes(), edges: getEdges() };

    try {
      await api.put(`/roadmaps/${roadmapId}`, {
        title: initialData.title,
        description: initialData.description,
        roadmap_data: roadmapData,
        is_public: initialData.is_public,
      });

      toast.success("Roadmap saved successfully!", );
    } catch (err) {
      console.error("Failed to save flow to roadmap");
      toast.error("Failed to save roadmap.");
    }
  };

  const handleLoadClick = () => fileInputRef.current?.click();

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setNodes(json.nodes || []);
        setEdges(json.edges || []);
        toast.success("Flow loaded from file.");
      } catch (err) {
        console.error("Invalid JSON file", err);
        toast.error("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Toaster />
      <div className="absolute top-4 left-0 flex gap-2 bg-[#2f3131] border border-[#4b4f51] rounded-md p-2 shadow-md z-50">
        <button
          onClick={() => zoomIn()}
          title="Zoom In"
          className="p-2 bg-[#1e1f1f] rounded-md text-gray-300 flex items-center justify-center cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => zoomOut()}
          title="Zoom Out"
          className="p-2 bg-[#1e1f1f] rounded-md text-gray-300 flex items-center justify-center cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => fitView()}
          title="Fit View"
          className="p-2 bg-[#1e1f1f] rounded-md text-gray-300 flex items-center justify-center cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleSaveJSON}
          title="Save as JSON"
          className="p-2 bg-[#1e1f1f] rounded-md text-green-400 flex items-center justify-center cursor-pointer"
        >
          <Save className="w-4 h-4" />
        </button>
        <button
          onClick={handleSaveRoadmap}
          title="Save to Roadmap"
          className="p-2 bg-[#1e1f1f] rounded-md text-blue-400 flex items-center justify-center cursor-pointer"
        >
          <Database className="w-4 h-4" />
        </button>
        <button
          onClick={handleLoadClick}
          title="Load Flow"
          className="p-2 bg-[#1e1f1f] rounded-md text-yellow-400 flex items-center justify-center cursor-pointer"
        >
          <Upload className="w-4 h-4" />
        </button>
        <button
          onClick={handleClear}
          title="Clear All Nodes"
          className="p-2 bg-[#1e1f1f] rounded-md text-red-400 flex items-center justify-center cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleLoad}
      />
    </>
  );
}
