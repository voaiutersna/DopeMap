"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useState } from "react";
import { MdPreview } from "md-editor-rt";
import { Star, ExternalLink, ChevronDown } from "lucide-react";
import { api } from "@/api";
import { TaskNodeData } from "../type";
import { HistoryType, TaskHistory } from "../../type";

export default function TaskSheet({
  data,
  historyData,
}: {
  data: TaskNodeData;
  historyData?: HistoryType | null;
}) {
  const [open, setOpen] = useState(false);

  const tasks = data.tasks ?? [];

  const [taskHistory, setTaskHistory] = useState<TaskHistory>(
    historyData?.task_history
      ? { ...historyData.task_history }
      : (() => {
          const initial: TaskHistory = {};
          tasks.forEach((task) => {
            initial[task.id] = { isdone: false, isStar: false };
          });
          return initial;
        })()
  );

  const saveHistory = async (updated: TaskHistory) => {
    if (!historyData?.id) return;
    try {
      const payload = { task_history: updated };
      await api.put(`/history/${historyData.id}`, payload);
    } catch (error) {
      console.error("Failed to update task history", error);
    }
  };

  const toggleDone = (taskId: string) => {
    setTaskHistory((prev) => {
      const prevTask = prev[taskId] ?? { isdone: false, isStar: false };
      const updated = { ...prev, [taskId]: { ...prevTask, isdone: !prevTask.isdone } };
      saveHistory(updated);
      return updated;
    });
  };

  const toggleStar = (taskId: string) => {
    setTaskHistory((prev) => {
      const prevTask = prev[taskId] ?? { isdone: false, isStar: false };
      const updated = { ...prev, [taskId]: { ...prevTask, isStar: !prevTask.isStar } };
      saveHistory(updated);
      return updated;
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
        <button className="w-full p-2 mt-2 text-gray-300 font-mono bg-transparent text-xs md:text-sm cursor-pointer transition-colors hover:text-white">
          View Tasks
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="min-w-full min-h-[100dvh] bg-[#1a1b1c] text-gray-300 border-l border-[#3a3d3f] rounded-none shadow-xl flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-4 sm:px-8 py-4 sm:py-5 border-b border-[#3a3d3f] bg-[#1c1d1e] flex-shrink-0">
          <SheetTitle className="text-lg sm:text-2xl md:text-3xl text-gray-300 tracking-tight">
            {data.title}
          </SheetTitle>
          <SheetDescription className="text-xs sm:text-sm md:text-base text-gray-400 mt-1 sm:mt-2">
            Review all tasks for this node below.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 px-4 py-10 container overflow-y-auto space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-xs sm:text-sm md:text-base italic text-center py-10">
              No tasks available.
            </p>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {tasks.map((task, i) => {
                const historyState = taskHistory[task.id] || { isdone: false, isStar: false };

                return (
                  <AccordionItem
                    key={task.id}
                    value={task.id}
                    className="border border-[#3a3d3f] bg-[#1e1f1f] rounded-xl shadow-sm transition-all"
                  >
                    <AccordionTrigger className="flex flex-col sm:flex-row justify-between sm:items-center w-full px-4 sm:px-5 py-3 sm:py-4 text-left text-gray-300 rounded-t-xl text-sm sm:text-base">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDone(task.id);
                          }}
                          className={`w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 transition-colors cursor-pointer ${
                            historyState.isdone ? "bg-green-500 border-green-500" : "bg-[#1e1f1f]"
                          }`}
                        >
                          {historyState.isdone && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className="text-sm sm:text-base">{task.title || `Task ${i + 1}`}</span>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2 sm:mt-0">
                        <span
                          className={`px-2 py-1 rounded text-xs sm:text-sm font-mono ${
                            task.difficult === "hard"
                              ? "text-red-600"
                              : task.difficult === "medium"
                              ? "text-yellow-500"
                              : task.difficult === "easy"
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        >
                          {task.difficult || "—"} ({task.dificultScore ?? 0}/10)
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(task.id);
                          }}
                          className={`w-6 h-6 flex items-center justify-center transition-colors rounded-full hover:bg-yellow-500/20 cursor-pointer ${
                            historyState.isStar ? "text-yellow-400" : "text-gray-600"
                          }`}
                        >
                          <Star className="w-5 h-5" />
                        </button>

                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 accordion-chevron" />
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 sm:px-5 py-6 sm:py-10 text-xs sm:text-sm md:text-base text-gray-300 border-t border-[#3a3d3f] bg-[#202122] rounded-b-xl space-y-5">
                      {/* Description */}
                      {task.description && (
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">
                            Description
                          </h3>
                          <p className="leading-relaxed text-gray-300 text-xs sm:text-sm md:text-base">{task.description}</p>
                        </div>
                      )}

                      {/* Markdown content */}
                      {task.content && (
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">
                            Content
                          </h3>
                          <div className="overflow-hidden text-xs sm:text-sm md:text-base">
                            <MdPreview id={`preview-${task.id}`} modelValue={task.content} className="markdown" language="en-US" />
                          </div>
                        </div>
                      )}

                      {/* Types */}
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Types</h3>
                        {task.types?.length ? (
                          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">{task.types.map((type: string, idx: number) => (
                            <span key={idx} className="bg-blue-500/10 text-blue-300 px-3 py-1.5 rounded-md border border-blue-500/30">{type}</span>
                          ))}</div>
                        ) : (
                          <p className="text-gray-500 text-xs sm:text-sm">—</p>
                        )}
                      </div>

                      {/* Links */}
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Links</h3>
                        <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                          {task.taskUrl && (
                            <a href={task.taskUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-300 border border-gray-600 hover:bg-gray-600 transition">
                                <ExternalLink className="w-4 h-4" />
                              </div>
                              <span className="text-gray-400 text-xs sm:text-sm">Task</span>
                            </a>
                          )}
                          {task.solutionUrl && (
                            <a href={task.solutionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-300 border border-gray-600 hover:bg-gray-600 transition">
                                <ExternalLink className="w-4 h-4" />
                              </div>
                              <span className="text-gray-400 text-xs sm:text-sm">Solution</span>
                            </a>
                          )}
                          {!task.taskUrl && !task.solutionUrl && <span className="text-gray-500 text-xs sm:text-sm">No links</span>}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
