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

  const initialTitle = (node.data as any)?.title ?? "";
  const initialContent = (node.data as any)?.content ?? "";

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

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
    <div className="container mx-auto p-6 font-mono  py-12">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-lg font-semibold">Edit Text Node</h1>
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
        </div>
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
