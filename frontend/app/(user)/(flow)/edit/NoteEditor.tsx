import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { X } from "lucide-react";
import type { CustomNode } from "../test/type";

type NoteEditorProps = {
  onClose: () => void;
  node: CustomNode;
};

export default function NoteEditor({ onClose, node }: NoteEditorProps) {
  const { setNodes } = useReactFlow();

  const initialLabel = (node.data as any)?.label ?? "Untitled Note";
  const initialContent = (node.data as any)?.content ?? "# Start writing your note...";

  const [label, setLabel] = useState(initialLabel);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                label,
                content,
              },
            }
          : n
      )
    );
    onClose();
  };

  return (
     <div className=" container mx-auto min-h-[100dvh] text-zinc-100 p-6 font-mono flex flex-col gap-6 overflow-y-auto py-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Edit Note</h1>
        <X
          className="w-6 h-6 text-red-500/80 cursor-pointer bg-red-900/20 rounded-full p-1 hover:bg-red-900/30 transition"
          onClick={onClose}
        />
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-5 ">
        {/* Note Title */}
        <label className="flex flex-col space-y-2">
          <span className="text-sm text-zinc-400">Note Title</span>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter note title"
            className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0"
          />
        </label>

        {/* Markdown Editor */}
        <div className="space-y-2">
          <span className="text-sm text-zinc-400">Content (Markdown)</span>
          <div className="rounded-md overflow-hidden border border-zinc-700">
            <MdEditor
              modelValue={content}
              onChange={setContent}
              theme="dark"
              previewTheme="github"
              language="en-US"
              style={{ height: "400px" }}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="px-5 py-2 border border-blue-600/90 text-blue-600 rounded-md hover:bg-blue-500/10 hover:scale-105 transition-transform duration-200"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}
