import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { X, PlusCircle, Trash2 } from "lucide-react";
import type { CustomNode, Task } from "../../type";
import DifficultyDropdown from "./components/DifficultyDropdown";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";



export default function TaskEditor({ onClose, node }: {
  onClose: () => void;
  node: CustomNode;
}) {
  const { setNodes } = useReactFlow();

  const [mainTitle, setMainTitle] = useState<string>(
    (node.data as any)?.title || ""
  );

  const initialTasks: Task[] =
    (node.data as any)?.tasks?.length > 0
      ? (node.data as any).tasks
      : [
          {
            id: uuidv4(),
            title: "",
            description: "",
            content: "# Write your task content here...",
            taskUrl: "",
            types: [],
            difficult: "",
            dificultScore: 0,
            solutionUrl: "",
          },
        ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTaskChange = (index: number, field: keyof Task, value: any) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
  };

  const addTask = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: uuidv4(),
        title: "",
        description: "",
        content: "# New Task...",
        taskUrl: "",
        types: [],
        difficult: "",
        dificultScore: 0,
        solutionUrl: "",
      },
    ]);
    setActiveIndex(tasks.length);
  };

  const removeTask = (index: number) => {
    if (tasks.length === 1) return;
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSave = () => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                title: mainTitle || "Untitled Node",
                tasks,
              },
            }
          : n
      )
    );
    onClose();
  };

  const activeTask = tasks[activeIndex];

  return (
    <div className="container mx-auto min-h-[100dvh] p-6 font-mono flex flex-col gap-6 overflow-y-auto py-12">

      <Header headerTitle={`Edit ${mainTitle || "Untitled Node"}`} onClose={onClose}/>

      {/* Main Node Title Input */}
      <label className="flex flex-col space-y-3">
        <span className="text-sm text-gray-500">Main Node Title</span>
        <input
          type="text"
          value={mainTitle}
          onChange={(e) => setMainTitle(e.target.value)}
          placeholder="Enter main title for this task node"
          className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0"
        />
      </label>

      {/* Active Task Editor */}
      {activeTask && (
        <div className="flex flex-col gap-5 mx-auto w-full">
          {/* Task Title */}
          <label className="flex flex-col space-y-3">
            <span className="text-sm text-gray-500">Task Title</span>
            <input
              type="text"
              value={activeTask.title}
              onChange={(e) =>
                handleTaskChange(activeIndex, "title", e.target.value)
              }
              placeholder="Enter task title"
              className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0"
            />
          </label>

          {/* Description */}
          <label className="flex flex-col space-y-3">
            <span className="text-sm text-gray-500">Description</span>
            <textarea
              value={activeTask.description}
              onChange={(e) =>
                handleTaskChange(activeIndex, "description", e.target.value)
              }
              placeholder="Short task summary"
              className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0"
            />
          </label>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col space-y-3">
              <span className="text-sm text-gray-500">Task URL</span>
              <input
                type="url"
                value={activeTask.taskUrl}
                onChange={(e) =>
                  handleTaskChange(activeIndex, "taskUrl", e.target.value)
                }
                placeholder="https://example.com"
                className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0"
              />
            </label>

            <label className="flex flex-col space-y-3">
              <span className="text-sm text-gray-500">Solution URL</span>
              <input
                type="url"
                value={activeTask.solutionUrl}
                onChange={(e) =>
                  handleTaskChange(activeIndex, "solutionUrl", e.target.value)
                }
                placeholder="https://solution.com"
                className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0"
              />
            </label>
          </div>

          {/* Types */}
          <label className="flex flex-col space-y-3">
            <span className="text-sm text-gray-500">Types</span>
            <div className="flex flex-wrap gap-2 border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0">
              {activeTask.types.map((tag, i) => (
                <div
                  key={`${tag}-${i}`}
                  className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-sm flex items-center gap-1 hover:opacity-50 duration-200 cursor-pointer"
                  onClick={() =>
                    handleTaskChange(
                      activeIndex,
                      "types",
                      activeTask.types.filter(
                        (t, idx) => !(t === tag && idx === i)
                      )
                    )
                  }
                >
                  {tag}
                </div>
              ))}

              <input
                type="text"
                placeholder="Add type..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    const newTag = e.currentTarget.value.trim();

                    if (!activeTask.types.includes(newTag)) {
                      handleTaskChange(activeIndex, "types", [
                        ...activeTask.types,
                        newTag,
                      ]);
                    }

                    e.currentTarget.value = "";
                    e.preventDefault();
                  }
                }}
                className="bg-transparent outline-none flex-1 min-w-[120px] text-sm text-zinc-300"
              />
            </div>
          </label>

          {/* Difficulty + Score */}
          <div className="flex gap-4">
            <label className="flex flex-col space-y-3 flex-1">
              <span className="text-sm text-gray-500">Difficulty</span>
              <div className="flex items-center gap-2">
                <DifficultyDropdown
                  value={activeTask.difficult}
                  onChange={(val) =>
                    handleTaskChange(activeIndex, "difficult", val)
                  }
                />
              </div>
            </label>

            <label className="flex flex-col space-y-3 w-48">
              <span className="text-sm text-gray-500">Score (1–10)</span>
              <input
                type="number"
                min={1}
                max={10}
                value={
                  activeTask.dificultScore === 0 ? "" : activeTask.dificultScore
                }
                placeholder="(1-10)"
                onChange={(e) =>
                  handleTaskChange(
                    activeIndex,
                    "dificultScore",
                    e.target.value === "" ? 0 : Number(e.target.value)
                  )
                }
                className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
                [-moz-appearance:textfield]"
              />
            </label>
          </div>

          {/* Markdown Editor */}
          <div className="space-y-2">
            <span className="text-sm text-zinc-400">Content (Markdown)</span>
            <div className="rounded-md overflow-hidden border border-zinc-700 text-gray-300">
              <MdEditor
                modelValue={activeTask.content}
                onChange={(val) =>
                  handleTaskChange(activeIndex, "content", val)
                }
                language="en-US"
                className={`markdown`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Task Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tasks.map((task, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-3 py-1 rounded-md border text-sm cursor-pointer duration-500 ${
              index === activeIndex
                ? "bg-blue-600/20 border-blue-500 text-blue-300"
                : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-blue-500/50"
            }`}
          >
            {task.title || `${index + 1}`}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 items-center justify-center">
        <button
          onClick={addTask}
          className="cursor-pointer flex items-center gap-1 px-5 py-2 border border-green-600/90 text-green-600 rounded-md hover:bg-green-500/10 hover:scale-105 transition-transform duration-150"
        >
          <PlusCircle className="w-4 h-4" /> Add Task
        </button>

        {activeTask && (
          <button
            onClick={() => removeTask(activeIndex)}
            className="cursor-pointer flex items-center gap-1 px-5 py-2 border border-red-600/90 text-red-600 rounded-md hover:bg-red-500/10 hover:scale-105 transition-transform duration-150"
          >
            <Trash2 className="w-4 h-4" /> Delete Task
          </button>
        )}

        <button
          onClick={handleSave}
          className="px-5 py-2 border border-blue-600/90 text-blue-600 rounded-md hover:bg-blue-500/10 hover:scale-105 transition-transform duration-200"
        >
          Save All Tasks
        </button>
      </div>
    </div>
  );
}
