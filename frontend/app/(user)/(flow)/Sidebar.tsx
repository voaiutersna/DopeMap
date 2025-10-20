import React from "react";
import { useDnD } from "./DnDContext";
import NoteNode from "./node/NoteNode";
import TaskNode from "./node/TaskNode";
import LinkNode from "./node/LinkNode";
import TextNode from "./node/TextNode";

export default function NodeSidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    if (setType) setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

return (
<aside className="p-4 bg-[#1e1f1f] border-l border-[#4b4f51] min-w-[220px] text-gray-300 font-mono">
  <div className="description mb-4 text-sm">
    Drag these nodes to the pane on the right.
  </div>
<div className="flex flex-col items-center gap-3">
  {/* Note Node */}
  <div
    onDragStart={(e) => onDragStart(e, "note")}
    draggable
    className="cursor-grab"
  >
    <div className="pointer-events-none">
      <NoteNode data={{ title: "Note Node" }} />
    </div>
  </div>

  {/* Task Node */}
  <div
    onDragStart={(e) => onDragStart(e, "task")}
    draggable
    className="cursor-grab"
  >
        <div className="pointer-events-none">

    <TaskNode data={{ title: "Task Node" }} />
        </div>
  </div>

  {/* Link Node */}
  <div
    onDragStart={(e) => onDragStart(e, "link")}
    draggable
    className="cursor-grab"
  >
        <div className="pointer-events-none">

    <LinkNode data={{ title: "Link Node", url: "https://example.com" }} />
        </div>
  </div>

  {/* Text Node */}
  <div
    onDragStart={(e) => onDragStart(e, "ctext")}
    draggable
    className="cursor-grab"
  >
        <div className="pointer-events-none">

    <TextNode data={{ title: null }} />
        </div>
  </div>
</div>

</aside>
);
}