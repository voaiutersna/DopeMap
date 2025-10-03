import React, { useCallback } from 'react'
import { Position, Handle } from '@xyflow/react';
import { NoteNodeData } from '../test/type';
import type { OnNodesChange } from '@xyflow/react';
export default function NoteNode({data}: {data:NoteNodeData}) {
      const onChange : React.ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    console.log(evt?.target?.value);
  }, []);
  return (
    <div className="text-updater-node border-2">
      <div>
        <label htmlFor="text">{data.label}</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
       <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
    </div>
  )
}
