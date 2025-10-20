import React from "react";
import { LinkNodeData } from "../test/type";
import { Link } from "lucide-react";
import { Position, Handle } from '@xyflow/react';

export default function LinkNode({ data }: { data: LinkNodeData }) {
  return (
<div className="bg-[#2f3131] text-gray-300 border border-[#4b4f51] rounded-md w-56 relative">
  {/* Title */}
  <div className="text-xs font-mono tracking-wider border-b border-[#4b4f51] w-full p-3">
    Url Node
  </div>

  {/* Content */}
  <div className="flex justify-between items-center p-3">
    <p className="text-[#1c459f]">{data.title || "test"}</p>
    <div className="w-10 h-10 rounded-full border border-[#4b4f51] flex items-center justify-center hover:bg-black/10 transition-colors duration-200 group relative z-20">
      <Link className="w-4 h-4 cursor-pointer" />
      {/* Tooltip */}
      <div className="group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 absolute -bottom-7 transition-all duration-300 p-2 bg-[#2f3131] border border-[#4b4f51] rounded-md">
        <p className="truncate w-[200px]">
          {data.url ||
            "https://www.youtube.com/watch?v=HYsz1hP0BFo&list=RDMM&index=8"}
        </p>
        <div className="w-2 h-2 absolute -top-1 left-1/2 -translate-x-1/2 rounded-full border border-[#4b4f51] bg-[#2f3131] z-[99999]"></div>
      </div>
    </div>
  </div>

  {/* Handles with overflow-hidden */}
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