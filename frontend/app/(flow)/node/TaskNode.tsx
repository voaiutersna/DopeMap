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
import { TaskNodeData } from "../test/type";
import { Handle, Position } from "@xyflow/react";

export default function TaskNode({ data }: TaskNodeProps) {
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
          <button className="w-full p-2 mt-2 text-gray-300 font-mono bg-transparent text-xs ">
            Edit Tasks
          </button>
        </SheetTrigger>

        <SheetContent className="bg-[#1a1b1c] text-gray-300 border border-[#3a3d3f] rounded-lg w-full lg:w-1/2 mx-auto shadow-xl">
          <SheetHeader className="px-6 py-4 border-b border-[#3a3d3f]">
            <SheetTitle className="text-lg font-semibold text-gray-200">Edit Task Node</SheetTitle>
            <SheetDescription className="text-sm text-gray-400 mt-1">
              Modify your task details and save changes when done.
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 py-4 flex flex-col gap-3">
            {tasks.map((task, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={task.title}
                  onChange={(e) => updateTaskTitle(idx, e.target.value)}
                  className="bg-[#1e1f1f] border border-[#3a3d3f] text-gray-300 placeholder-gray-500 focus:border-[#1c459f] focus:ring-1 focus:ring-[#1c459f] rounded px-3 py-2 text-xs flex-1"
                />
                <button onClick={() => removeTask(idx)} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button onClick={addTask} className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs mt-1">
              <Plus size={16} /> Add Task
            </button>
          </div>

          <SheetFooter className="flex justify-end gap-3 px-6 py-4 border-t border-[#3a3d3f]">
            <Button type="submit" className="bg-[#1c459f] text-white border-none hover:bg-[#154087] px-4 py-2 rounded">
              Save
            </Button>
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