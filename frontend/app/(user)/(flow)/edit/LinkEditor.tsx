import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { LinkNodeData } from '../types'; // adjust path if needed
import { CustomNode } from '../type';
import { useReactFlow } from '@xyflow/react';

type LinkEditorProps = {
  onClose: () => void;
  node: CustomNode;
};

export default function LinkEditor({ onClose, node }: LinkEditorProps) {
 const { setNodes } = useReactFlow(); 
  const [title, setTitle] = useState(node?.data?.title ?? "");
  const [url, setUrl] = useState(node?.data?.url ?? "");


  const handleSave = () => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                title,
                url,
              },
            }
          : n
      )
    );

    onClose();
  };

  return (
    <div className="container mx-auto p-6 font-mono py-12">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-lg font-semibold">Edit Url Node</h1>
          <X
            className="w-5 h-5 text-red-500/80 cursor-pointer bg-red-900/10 rounded-full"
            onClick={onClose}
          />
        </div>

        <div className="flex flex-col space-y-6">
          <label className="flex flex-col space-y-3">
            <span className="text-sm text-gray-500">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0"
            />
          </label>

          <label className="flex flex-col space-y-3">
            <span className="text-sm text-gray-500 ">URL</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0"
            />
          </label>
        </div>

        {/* Save button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-blue-600/90 text-blue-600 rounded-sm hover:-blue-700 cursor-pointer hover:scale-105 duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
