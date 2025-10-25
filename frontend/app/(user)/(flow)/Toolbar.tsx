import React, { useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Trash2, Save, Upload } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

export default function Toolbar() {
  const { zoomIn, zoomOut, fitView, setNodes, setEdges, getNodes, getEdges } = useReactFlow();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clear all nodes and edges
  const handleClear = () => {
    setNodes([]);
    setEdges([]);
  };

  // Save current flow to JSON
  const handleSave = () => {
    const data = {
      nodes: getNodes(),
      edges: getEdges(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flow.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Trigger file input for import
  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  // Load JSON into React Flow
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
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="absolute top-4 left-0 flex gap-2 bg-[#2f3131] border border-[#4b4f51] rounded-md p-2 shadow-md z-50">
        <button
          onClick={zoomIn}
          className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-gray-300 flex items-center justify-center"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={zoomOut}
          className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-gray-300 flex items-center justify-center"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={fitView}
          className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-gray-300 flex items-center justify-center"
          title="Fit View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={handleSave}
          className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-green-400 flex items-center justify-center"
          title="Save Flow"
        >
          <Save className="w-4 h-4" />
        </button>

        <button
          onClick={handleLoadClick}
          className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-yellow-400 flex items-center justify-center"
          title="Load Flow"
        >
          <Upload className="w-4 h-4" />
        </button>

        <button
          onClick={handleClear}
          className="p-2 bg-[#1e1f1f] hover:bg-[#3a3c3c] rounded-md text-red-400 flex items-center justify-center"
          title="Clear All Nodes"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

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