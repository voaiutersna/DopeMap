"use client";
import React, { useRef, useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Trash2,
  Save,
  Upload,
  Database,
  Plus,
} from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { api } from "@/api";
import Toaster from "@/components/Toaster";
import { toast } from "react-toastify";
import {
  defaultNoteNodeData,
  defaultTaskNodeData,
  defaultLinkNodeData,
  defaultTextNodeData,
} from "./defaultNodeData";

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
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  const addNodeAtCenterOfNodes = (type: string) => {
    let position = { x: 0, y: 0 };
    const nodes = getNodes();
    if (nodes.length > 0) {
      const total = nodes.reduce(
        (acc, node) => {
          acc.x += node.position.x;
          acc.y += node.position.y;
          return acc;
        },
        { x: 0, y: 0 }
      );

      position = {
        x: total.x / nodes.length,
        y: total.y / nodes.length,
      };
    }

    const newNode: any = { id: `${Date.now()}`, type, position };

    switch (type) {
      case "note":
        newNode.data = { ...defaultNoteNodeData };
        break;
      case "task":
        newNode.data = { ...defaultTaskNodeData };
        break;
      case "link":
        newNode.data = { ...defaultLinkNodeData };
        break;
      case "ctext":
        newNode.data = { ...defaultTextNodeData };
        break;
      default:
        return;
    }

    setNodes((nds) => nds.concat(newNode));
    setShowAddDropdown(false);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    toast.info("All nodes cleared.");
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

      toast.success("Roadmap saved successfully!");
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

      <div
        className="absolute top-4
                md:left-4 md:-translate-x-0  transform
                left-1/2 -translate-x-1/2 flex flex-wrap gap-2  justify-center
                bg-[#2f3131] border border-[#4b4f51] rounded-md p-2 shadow-md z-50
                 max-w-full"
      >
        {/* Add Node */}
    <div className="relative inline-block">
      <button
        onClick={() => setShowAddDropdown((prev) => !prev)}
        title="Add Node"
        className="p-2 bg-[#1e1f1f] rounded-md text-white flex items-center justify-center cursor-pointer"
      >
        <Plus className="w-4 h-4" />
      </button>

        <div className={`${showAddDropdown ? "scale-100 opacity-100 pointer-events-auto" : "scale-0 opacity-0 pointer-events-none"} duration-200 absolute left-0 top-full mt-1 w-32 bg-[#2f3131] border border-[#4b4f51] rounded-md shadow-md flex flex-col z-50`}>
          {["note", "task", "link", "ctext"].map((type) => (
            <button
              key={type}
              onClick={() => addNodeAtCenterOfNodes(type)}
              className="px-2 py-1 hover:bg-[#1e1f1f] text-gray-300 text-left whitespace-nowrap"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Node
            </button>
          ))}
        </div>
    </div>
        {/* Zoom & Fit */}
        <button className="p-2 bg-[#1e1f1f] hover:bg-gray-400 rounded-md text-gray-300 flex items-center justify-center cursor-pointer" onClick={()=>{(zoomIn())}}>
          <ZoomIn className="w-4 h-4" />
        </button>
        <button className="p-2 bg-[#1e1f1f] hover:bg-gray-400 rounded-md text-gray-300 flex items-center justify-center cursor-pointer" onClick={()=>{(zoomOut())}}>
          <ZoomOut className="w-4 h-4" />
        </button>
        <button className="p-2 bg-[#1e1f1f] hover:bg-gray-400 rounded-md text-gray-300 flex items-center justify-center cursor-pointer" onClick={()=>{(fitView())}}>
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Save / Load */}
        <button
          className="p-2 bg-[#1e1f1f] hover:bg-gray-400 rounded-md text-green-400 flex items-center justify-center cursor-pointer "
          onClick={handleSaveJSON}
        >
          <Save className="w-4 h-4" />
        </button>
        <button
          className="p-2 bg-[#1e1f1f] hover:bg-gray-400 rounded-md text-blue-400 flex items-center justify-center cursor-pointer"
          onClick={handleSaveRoadmap}
        >
          <Database className="w-4 h-4" />
        </button>
        <button
          className="p-2 bg-[#1e1f1f] hover:bg-gray-400 rounded-md text-yellow-400 flex items-center justify-center cursor-pointer"
          onClick={handleLoadClick}
        >
          <Upload className="w-4 h-4" />
        </button>
        <button
          className="p-2 bg-[#1e1f1f] hover:bg-gray-400 rounded-md text-red-400 flex items-center justify-center cursor-pointer"
          onClick={handleClear}
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
