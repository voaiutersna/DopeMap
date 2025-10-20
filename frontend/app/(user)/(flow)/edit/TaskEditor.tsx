import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { X } from "lucide-react";
import type { CustomNode, Task } from "../test/type";

type TaskEditorProps = {
  onClose: () => void;
  node: CustomNode;
};

export default function TaskEditor({ onClose, node }: TaskEditorProps) {
  const { setNodes } = useReactFlow();

  // Safely load task data or use default
  const initialTask: Task =
    (node.data as any)?.tasks?.[0] ?? {
      title: "",
      description: "",
      content: "# Write your task content here...",
      taskUrl: "",
      types: [],
      difficult: "",
      dificultScore: 0,
      solutionUrl: "",
    };

  const [task, setTask] = useState<Task>(initialTask);

  // Update task field
  const handleChange = (field: keyof Task, value: any) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  // Save updates to node
  const handleSave = () => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                title: task.title,
                tasks: [task],
              },
            }
          : n
      )
    );
    onClose();
  };

  return (
    <div className="min-h-[100dvh] text-zinc-100 p-6 font-mono flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Edit Task Node</h1>
        <X
          className="w-6 h-6 text-red-500/80 cursor-pointer bg-red-900/20 rounded-full p-1 hover:bg-red-900/30 transition"
          onClick={onClose}
        />
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-5 max-w-3xl mx-auto w-full">
        {/* Title */}
        <label className="flex flex-col space-y-2">
          <span className="text-sm text-zinc-400">Title</span>
          <input
            type="text"
            value={task.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter task title"
            className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          />
        </label>

        {/* Description */}
        <label className="flex flex-col space-y-2">
          <span className="text-sm text-zinc-400">Description</span>
          <textarea
            value={task.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Short task summary"
            className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 h-24 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          />
        </label>

        {/* Task URL */}
        <label className="flex flex-col space-y-2">
          <span className="text-sm text-zinc-400">Task URL</span>
          <input
            type="url"
            value={task.taskUrl}
            onChange={(e) => handleChange("taskUrl", e.target.value)}
            placeholder="https://example.com"
            className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          />
        </label>

        {/* Types */}
        <label className="flex flex-col space-y-2">
          <span className="text-sm text-zinc-400">Types (comma separated)</span>
          <input
            type="text"
            value={task.types.join(", ")}
            onChange={(e) =>
              handleChange(
                "types",
                e.target.value.split(",").map((t) => t.trim())
              )
            }
            placeholder="frontend, react, ui"
            className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          />
        </label>

        {/* Difficulty + Score */}
        <div className="flex gap-4">
          <label className="flex flex-col space-y-2 flex-1">
            <span className="text-sm text-zinc-400">Difficulty</span>
            <select
              value={task.difficult}
              onChange={(e) => handleChange("difficult", e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <label className="flex flex-col space-y-2 w-32">
            <span className="text-sm text-zinc-400">Score</span>
            <input
              type="number"
              value={task.dificultScore}
              onChange={(e) =>
                handleChange("dificultScore", Number(e.target.value))
              }
              className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
            />
          </label>
        </div>

        {/* Solution URL */}
        <label className="flex flex-col space-y-2">
          <span className="text-sm text-zinc-400">Solution URL</span>
          <input
            type="url"
            value={task.solutionUrl}
            onChange={(e) => handleChange("solutionUrl", e.target.value)}
            placeholder="https://solution.com"
            className="bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          />
        </label>

        {/* Markdown Editor for Content */}
        <div className="space-y-2">
          <span className="text-sm text-zinc-400">Content (Markdown)</span>
          <div className="rounded-md overflow-hidden border border-zinc-700">
            <MdEditor
              modelValue={task.content}
              onChange={(val) => handleChange("content", val)}
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
            className="px-5 py-2 border border-blue-500 text-blue-400 rounded-md hover:bg-blue-500/10 hover:scale-105 transition-transform duration-200"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}
