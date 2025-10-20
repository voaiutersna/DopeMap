import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { X } from "lucide-react";
import type { CustomNode } from "../test/type";

type TextEditorProps = {
  onClose: () => void;
  node: CustomNode;
};

export default function TextEditor({ onClose, node }: TextEditorProps) {
  const { setNodes } = useReactFlow();

  // Initialize from node data
  const initialTitle = (node.data as any)?.title ?? "";
  const initialContent = (node.data as any)?.content ?? "";

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  // Save changes to React Flow node
  const handleSave = () => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                title,
                content,
              },
            }
          : n
      )
    );
    onClose();
  };

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 p-6 font-mono flex flex-col gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Edit Text Node</h1>
        <X
          className="w-6 h-6 text-red-500/80 cursor-pointer bg-red-900/20 rounded-full p-1 hover:bg-red-900/30 transition"
          onClick={onClose}
        />
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5 max-w-3xl mx-auto w-full">
        {/* Title */}
        <label className="flex flex-col space-y-2">
          <span className="text-sm text-zinc-400">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter text title"
            className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          />
        </label>

        {/* Content */}
        <label className="flex flex-col space-y-2">
          <span className="text-sm text-zinc-400">Content</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here..."
            className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 h-[300px] resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          />
        </label>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="px-5 py-2 border border-blue-500 text-blue-400 rounded-md hover:bg-blue-500/10 hover:scale-105 transition-transform duration-200"
          >
            Save Text
          </button>
        </div>
      </div>
    </div>
  );
}