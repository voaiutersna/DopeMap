"use client";
import { useState, useCallback, useRef, useEffect } from "react";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TaskNode from "./node/TaskNode";
import NoteNode from "./node/NoteNode";
import LinkNode from "./node/LinkNode";
import { DnDProvider, useDnD } from "./DnDContext";
import Sidebar from "./Sidebar";
import TextNode from "./node/TextNode";
import NodeWrapper from "./node/Nodewrapper";
import Toolbar from "./Toolbar";
import { v4 as uuidv4 } from "uuid";
import Editor from "./edit/Editor";
import ViewSidebar from "./view/[flowId]/ViewSideBar";
import { defaultLinkNodeData, defaultNoteNodeData, defaultTaskNodeData, defaultTextNodeData } from "./defaultNodeData";

const getId = () => `${uuidv4()}`;

const DnDFlow = ({ isEdit ,roadmapId,initialData}: { isEdit?: boolean ,roadmapId: any,initialData? : any}) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editNodeId, setEditNodeId] = useState<string | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = {
    note: (props: any) =>
      isEdit ? (
        <NodeWrapper id={props.id} setEditNodeId={setEditNodeId}>
          <NoteNode {...props} />
        </NodeWrapper>
      ) : (
        <NoteNode {...props} />
      ),

    task: (props: any) =>
      isEdit ? (
        <NodeWrapper id={props.id} setEditNodeId={setEditNodeId}>
          <TaskNode {...props} />
        </NodeWrapper>
      ) : (
        <TaskNode {...props} />
      ),

    link: (props: any) =>
      isEdit ? (
        <NodeWrapper id={props.id} setEditNodeId={setEditNodeId}>
          <LinkNode {...props} />
        </NodeWrapper>
      ) : (
        <LinkNode {...props} />
      ),

    ctext: (props: any) =>
      isEdit ? (
        <NodeWrapper id={props.id} setEditNodeId={setEditNodeId}>
          <TextNode {...props} />
        </NodeWrapper>
      ) : (
        <TextNode {...props} />
      ),
  };

   useEffect(() => {
    if (initialData.roadmap_data && (initialData.roadmap_data.nodes || initialData.roadmap_data.edges)) {
      setNodes(initialData.roadmap_data.nodes || []);
      setEdges(initialData.roadmap_data.edges || []);
    }
  }, [initialData, setNodes, setEdges]);


  const [type, setType] = useDnD();

  const onConnect: OnConnect = useCallback(
    (params: Node) => setEdges((eds: Edge) => addEdge(params, eds)),
    []
  );

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
  (event) => {
    event.preventDefault();

    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Map type to default data
    let data;
    switch (type) {
      case "note":
        data = { ...defaultNoteNodeData };
        break;
      case "task":
        data = { ...defaultTaskNodeData };
        break;
      case "link":
        data = { ...defaultLinkNodeData };
        break;
      case "ctext":
        data = { ...defaultTextNodeData };
        break;
      default:
        data = { label: `${type} node` };
    }

    const newNode: Node = {
      id: getId(),
      type: type,
      position,
      data,
    };

    setNodes((nds) => nds.concat(newNode));
  },
  [screenToFlowPosition, type]
);

  const onDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="dndflow flex w-full h-[calc(100vh-56px)]  relative  justify-center">
      {isEdit && (
        <div className="container absolute top-4 left-0-translate-x-1/2">
          <Toolbar roadmapId={roadmapId} initialData={initialData}/>
        </div>
      )}
      <div className="w-full h-full bg-[#2f3131] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={isEdit ? onNodesChange : undefined}
          onEdgesChange={isEdit ? onEdgesChange : undefined}
          onConnect={isEdit ? onConnect : undefined}
          onDrop={isEdit ? onDrop : undefined}
          onDragStart={isEdit ? onDragStart : undefined}
          onDragOver={isEdit ? onDragOver : undefined}
          fitView
          defaultEdgeOptions={{ type: "step" }}
          snapToGrid={true}
          snapGrid={[20, 20]}
          minZoom={0.5}
          maxZoom={2}
          nodesDraggable={isEdit}
          nodesConnectable={isEdit}
          elementsSelectable={isEdit}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={true}
          panOnDrag={true}
        >
          {/* <Controls /> */}

          {/* <Background /> */}
          <div className="absolute top-2 right-2 z-50 w-48 h-48 rounded-md overflow-hidden shadow-md">
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case "note":
                    return "#f59e0b"; // orange
                  case "task":
                    return "#10b981"; // green
                  case "link":
                    return "#3b82f6"; // blue
                  case "ctext":
                    return "#8b5cf6"; // purple
                  default:
                    return "#9ca3af"; // gray for any other type
                }
              }}
              nodeStrokeColor={() => "#ffffff"} // white border for visibility
              nodeBorderRadius={4}
            />
          </div>
        </ReactFlow>
      </div>
      {isEdit ? <Sidebar /> : <ViewSidebar />}
      {isEdit && (
        <div
          className={`fixed inset-0 z-50 transition-all duration-500 ${
            editNodeId ? "translate-y-0" : "translate-y-full"
          } flex items-end`}
        >
          <div className="relative w-full max-h-[100dvh] bg-[#1e1f1f] text-gray-300 border-[#3a3d3f]  shadow-xl overflow-y-auto">
            {nodes.map(
              (node) =>
                node.id === editNodeId && (
                  <Editor
                    key={node.id}
                    editNode={node}
                    setEditNodeId={setEditNodeId}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ({ isEdit ,roadmapId,initialData}: { isEdit?: boolean ,roadmapId: any,initialData? : any}) => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow isEdit={isEdit} roadmapId={roadmapId} initialData={initialData}/>
    </DnDProvider>
  </ReactFlowProvider>
);
