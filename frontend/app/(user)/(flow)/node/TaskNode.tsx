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
import TaskSheet from "./TaskSheet";

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
    <TaskSheet data={data}/>

      <div className="overflow-hidden w-full h-full absolute top-0 pointer-events-none">
        <Handle type="source" position={Position.Top} className="!w-3 !h-3 !bg-[#4b4f51]/50 !border-transparent !rounded-full" />
        <Handle type="target" position={Position.Bottom} className="!w-3 !h-3 !bg-[#4b4f51]/50 !border-transparent !rounded-full" />
      </div>
    </div>
  );
}