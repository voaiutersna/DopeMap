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
  MiniMap,
} from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import TaskNode from './node/TaskNode';
import NoteNode from './node/NoteNode';
import LinkNode from './node/LinkNode';
import { DnDProvider, useDnD } from './DnDContext';
import Sidebar from './Sidebar';
import TextNode from './node/TextNode';
import NodeWrapper from './node/Nodewrapper';
import Toolbar from './Toolbar';
import { v4 as uuidv4 } from 'uuid';
// import "./index.css"

const nodeTypes = {
  note: (props: any) => (
    <NodeWrapper id={props.id}>
      <NoteNode {...props} />
    </NodeWrapper>
  ),
  task: (props: any) => (
    <NodeWrapper id={props.id}>
      <TaskNode {...props} />
    </NodeWrapper>
  ),
  link: (props: any) => (
    <NodeWrapper id={props.id}>
      <LinkNode {...props} />
    </NodeWrapper>
  ),
  ctext: (props: any) => (
    <NodeWrapper id={props.id}>
      <TextNode {...props} />
    </NodeWrapper>
  ),
};
 

const getId = () => `dndnode_${uuidv4()}`;
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([

  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type,setType] = useDnD();
 
  const onConnect : OnConnect = useCallback((params:Node) => setEdges((eds : Edge) => addEdge(params, eds)), []);
 
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
 
      setNodes((nds : Node) => nds.concat( newNode));
    },
    [screenToFlowPosition, type],
  );
 
const onDragStart : React.DragEventHandler<HTMLDivElement>   = (event) => {
  event.dataTransfer.effectAllowed = 'move';
};

 
  return (
    <div className="dndflow flex w-screen h-screen ">
    <Toolbar/>
    <div className="w-full h-full bg-[#2f3131]" >
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
          defaultEdgeOptions={{ type: "step" }}
          snapToGrid={true}
          snapGrid={[20, 20]}
          minZoom={0.5}
          maxZoom={2}
        >
          {/* <Controls /> */}

          {/* <Background /> */}
<div className="absolute top-2 right-2 z-50 w-48 h-48 rounded-md overflow-hidden shadow-md">
  <MiniMap
    nodeColor={(node) => {
      switch (node.type) {
        case 'note':
          return '#f59e0b'; // orange
        case 'task':
          return '#10b981'; // green
        case 'link':
          return '#3b82f6'; // blue
        case 'ctext':
          return '#8b5cf6'; // purple
        default:
          return '#9ca3af'; // gray for any other type
      }
    }}
    nodeStrokeColor={() => '#ffffff'} // white border for visibility
    nodeBorderRadius={4}
  />
</div>
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
