import { useState } from "react";
import { Task, TaskNodeData } from "../type";
import { Handle, Position } from "@xyflow/react";
import TaskSheet from "./TaskSheet";
import { HistoryType } from "../../type";


export default function TaskNode({ data,historyData }: {data : TaskNodeData,   historyData? : HistoryType | null;}) {

  return (
    <div className="bg-[#2f3131] text-gray-300 border border-[#4b4f51] rounded-md w-56 shadow-md relative p-2">

      <div className="text-xs font-mono tracking-wider border-b border-[#4b4f51] w-full p-3">
        {data.title || "Task Node"}
      </div>


    <TaskSheet data={data} historyData={historyData}/>

      <div className="overflow-hidden w-full h-full absolute top-0 pointer-events-none">
        <Handle type="source" position={Position.Top} className="!w-3 !h-3 !bg-[#4b4f51]/50 !border-transparent !rounded-full" />
        <Handle type="target" position={Position.Bottom} className="!w-3 !h-3 !bg-[#4b4f51]/50 !border-transparent !rounded-full" />
      </div>
    </div>
  );
}