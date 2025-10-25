import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Task, TaskNodeData } from "../type";
import { Handle, Position } from "@xyflow/react";
import { Check, Star, StarOff } from "lucide-react"; 

export default function TaskNode({ data }: {data : TaskNodeData}) {
  const [tasks, setTasks] = useState<Task[]>(data.tasks || []);

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        title: "New Task",
        description: "",
        content: "",
        taskUrl: "",
        types: [],
        difficult: "",
        dificultScore: 0,
        solutionUrl: "",
      },
    ]);
  };

  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const updateTaskTitle = (index: number, title: string) => {
    const newTasks = [...tasks];
    newTasks[index].title = title;
    setTasks(newTasks);
  };

  return (
    <div className="bg-[#2f3131] text-gray-300 border border-[#4b4f51] rounded-md w-56 shadow-md relative p-2">
      {/* Node only shows title */}
      <div className="text-xs font-mono tracking-wider border-b border-[#4b4f51] w-full p-3">
        {data.title || "Task Node"}
      </div>

      {/* Sheet for editing tasks */}
<Sheet>
  <SheetTrigger asChild>
    <button className="w-full p-2 mt-2 text-gray-300 font-mono bg-transparent text-xs cursor-pointer">
      View Task
    </button>
  </SheetTrigger>

  <SheetContent className="bg-[#1a1b1c] text-gray-300 border border-[#3a3d3f] rounded-lg w-full lg:w-1/2 mx-auto shadow-xl">
    <SheetHeader className="px-6 py-4 border-b border-[#3a3d3f]">
      <SheetTitle className="text-lg font-semibold text-gray-200">View Task Node</SheetTitle>
      <SheetDescription className="text-sm text-gray-400 mt-1">
        Review your tasks below.
      </SheetDescription>
    </SheetHeader>

    <div className="px-6 py-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-xs italic">No tasks available.</p>
      ) : (
        tasks.map((task, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-[#1e1f1f] border border-[#3a3d3f] rounded px-3 py-2 text-xs"
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={task.completed} // assuming you have completed property
              disabled
              className="w-4 h-4 text-blue-500 rounded border-gray-600 bg-gray-800"
            />

            {/* Task Title */}
            <span className={`flex-1 text-gray-200 ${task.completed ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </span>

            {/* Star / Favorite */}
            {task.favorite ? (
              <Star className="w-4 h-4 text-yellow-400" />
            ) : (
              <StarOff className="w-4 h-4 text-gray-500" />
            )}
          </div>
        ))
      )}
    </div>

    <SheetFooter className="flex justify-end gap-3 px-6 py-4 border-t border-[#3a3d3f]">
      <SheetClose asChild>
        <Button variant="outline" className="text-gray-300 border border-[#3a3d3f] px-4 py-2 rounded hover:bg-gray-800">
          Close
        </Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>

      <div className="overflow-hidden w-full h-full absolute top-0 pointer-events-none">
        <Handle type="source" position={Position.Top} className="!w-3 !h-3 !bg-[#4b4f51]/50 !border-transparent !rounded-full" />
        <Handle type="target" position={Position.Bottom} className="!w-3 !h-3 !bg-[#4b4f51]/50 !border-transparent !rounded-full" />
      </div>
    </div>
  );
}