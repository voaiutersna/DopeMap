import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { MdEditor } from 'md-editor-rt';
import { useState } from "react";
import { TaskNodeData } from "../test/type";
import { Handle, Position } from "@xyflow/react";

export default function TaskNode({ data }: { data: TaskNodeData }) {
  const [text, setText] = useState('# Hello Editor');

  return (
    <div className="bg-[#2f3131] text-gray-300 border border-[#4b4f51] rounded-md w-56 shadow-md relative p-2">
      <div className="text-xs font-mono tracking-wider border-b border-[#4b4f51] w-full p-3">
        {'Task Node'}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-full p-4 text-gray-300 font-mono bg-transparent border-transparent text-xs">
            {data.title || "No Task Data"}
          </button>
        </SheetTrigger>

        <SheetContent className="bg-[#2f3131] text-gray-300 border border-[#4b4f51]">
          <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
            <SheetDescription>
              Modify your task details and save changes when done.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-4 px-2">
            <div className="grid gap-2">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input
                id="sheet-demo-name"
                defaultValue={data.title || ''}
                className="bg-[#1e1f1f] border border-[#4b4f51] text-gray-300 focus:border-[#1c459f]"
              />
            </div>
          </div>

          <div className="my-4">
            <MdEditor
              modelValue={text}
              onChange={setText}
              style={{
                height: '200px',
                backgroundColor: '#1e1f1f',
                color: '#ddd',
                border: '1px solid #4b4f51',
              }}
            />
          </div>

          <SheetFooter className="flex justify-end gap-2">
            <Button type="submit" className="bg-[#1c459f] text-white border-none hover:bg-[#154087]">
              Save
            </Button>
            <SheetClose asChild>
              <Button variant="outline" className="text-gray-300 border-[#4b4f51]">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className="overflow-hidden w-full h-full absolute top-0">
          <Handle
            type="source"
            position={Position.Top}
            className="!w-3 !h-3 !bg-[#4b4f51]/50 !border-transparent !rounded-full"
          />
          <Handle
            type="target"
            position={Position.Bottom}
            className="!w-3 !h-3 !bg-[#4b4f51]/50 !border-transparent !rounded-full"
          />
        </div>
    </div>
  );
}