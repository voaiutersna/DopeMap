import React, { useCallback } from 'react';
import { Position, Handle } from '@xyflow/react';
import { NoteNodeData } from '../type';
import { Textarea } from '@/components/ui/textarea';
import { MdPreview } from 'md-editor-rt';

export default function NoteNode({ data }: { data: NoteNodeData }) {

  return (
    <div className="bg-[#2f3131] text-gray-300 border border-[#4b4f51] rounded-md  shadow-md relative">
      {/* Title */}
      <div className="text-xs font-mono tracking-wider border-b border-[#4b4f51] w-full p-3">
        {'Note Node'}
      </div>

      {/* Textarea */}
      <div className="p-3">
        <MdPreview
          id="text"
          value={data.content}
          placeholder="Type here..."
          className="
            w-full min-w-[200px] 
            h-20 min-h-[60px] 
            p-2 text-gray-300 bg-[#1e1f1f]/10
            rounded-md focus:outline-none nodrag
            resize-none
          "
        />
      </div>

      {/* Handles */}
      <div className="overflow-hidden w-full h-full absolute top-0 pointer-events-none">
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
