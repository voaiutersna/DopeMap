"use client";
import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type DefaultEdgeOptions,
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import TaskNode from './node/TaskNode';
import NoteNode from './node/NoteNode';
import LinkNode from './node/LinkNode';
import { DnDProvider, useDnD } from './DnDContext';
import Sidebar from './Sidebar';
// import "./index.css"

const nodeTypes = {
  "note" : NoteNode,
  "task" : TaskNode,
  "link" : LinkNode,
}
 
let id = 0;
const getId = () => `dndnode_${id++}`;
 
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type,setType] = useDnD();
 
  const onConnect : OnConnect = useCallback((params ) => setEdges((eds) => addEdge(params, eds)), []);
 
  const onDragOver : React.DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop : React.DragEventHandler<HTMLDivElement>   = useCallback(
    (event) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!type) {
        return;
      }
 
      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      console.log(type)
      const newNode = {
        id: getId(),
        type : type as unknown as string,
        position,
        data: { label: `${type} node` },
      };
 
      setNodes((nds) => nds.concat( newNode));
    },
    [screenToFlowPosition, type],
  );
 
const onDragStart : React.DragEventHandler<HTMLDivElement>   = (event) => {
  event.dataTransfer.effectAllowed = 'move';
};

 
  return (
    <div className="dndflow flex w-screen h-screen ">
    <div className="w-full h-full " >
        <ReactFlow
          nodes={nodes}
          edges={edges}  
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};
 
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
