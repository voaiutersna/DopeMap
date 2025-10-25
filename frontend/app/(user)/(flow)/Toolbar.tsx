import React, { useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Trash2, Save, Upload, Database } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import axios from 'axios';
import { api } from '@/api';

interface ToolbarProps {
  roadmapId: string;
  initialData: any;
}

export default function Toolbar({ roadmapId,initialData }: ToolbarProps) {
  const { zoomIn, zoomOut, fitView, setNodes, setEdges, getNodes, getEdges } = useReactFlow();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleSaveJSON = () => {
    const data = { nodes: getNodes(), edges: getEdges() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flow.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveRoadmap = async () => {
    const roadmapData = { nodes: getNodes(), edges: getEdges() };
    try {
      await api.put(`/roadmaps/${roadmapId}`, {
        title: initialData.title,
        description:  initialData.description,
        roadmap_data: roadmapData,
        is_public: initialData.description.is_public,
      });
      alert('Flow saved to roadmap successfully!');
    } catch (err) {
      console.error('Failed to save flow to roadmap', err);
      alert('Failed to save flow to roadmap');
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
      } catch (err) {
        console.error('Invalid JSON file', err);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="absolute top-4 left-0 flex gap-2 bg-[#2f3131] border border-[#4b4f51] rounded-md p-2 shadow-md z-50">
        <button onClick={zoomIn} title="Zoom In" className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-gray-300 flex items-center justify-center">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={zoomOut} title="Zoom Out" className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-gray-300 flex items-center justify-center">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={fitView} title="Fit View" className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-gray-300 flex items-center justify-center">
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Save JSON */}
        <button onClick={handleSaveJSON} title="Save as JSON" className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-green-400 flex items-center justify-center">
          <Save className="w-4 h-4" />
        </button>

        {/* Save to Roadmap */}
        <button onClick={handleSaveRoadmap} title="Save to Roadmap" className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-blue-400 flex items-center justify-center">
          <Database className="w-4 h-4" />
        </button>

        <button onClick={handleLoadClick} title="Load Flow" className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-yellow-400 flex items-center justify-center">
          <Upload className="w-4 h-4" />
        </button>
        <button onClick={handleClear} title="Clear All Nodes" className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-red-400 flex items-center justify-center">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <input type="file" accept="application/json" ref={fileInputRef} className="hidden" onChange={handleLoad} />
    </>
  );
}
