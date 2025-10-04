import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { MoreVertical } from "lucide-react"; // import icon

type NodeWrapperProps = {
  id: string; // Node id for deletion
  children: React.ReactNode; // The actual node content
};

export default function NodeWrapper({ id, children }: NodeWrapperProps) {
  const { setNodes } = useReactFlow();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleDelete = () => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuVisible((v) => !v);
  };

  return (
<div
  className="relative"
  onContextMenu={handleRightClick}
>
  {children}

  {/* Icon button */}
  <div className="absolute -top-2 -right-2">
    <button
      onClick={() => setMenuVisible((v) => !v)}
      className="text-gray-400 hover:text-gray-200 z-20 bg-[#2f3131] border border-[#4b4f51] rounded-full w-5 h-5 flex justify-center items-center"
    >
      <MoreVertical className="w-4 h-4" />
    </button>

    {/* Menu appears to the right of the button with auto width */}
<div className="absolute top-0 left-full ml-1 z-30">
  <div
    className={`
      bg-[#2f3131] text-gray-300 border border-[#4b4f51] rounded-md p-2 shadow-md
      inline-block whitespace-nowrap
      transition-all duration-200 ease-in-out transform
      ${menuVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
    `}
  >
    <button
      onClick={handleDelete}
      className="block w-full text-left hover:bg-[#4b4f51]/30 px-2 py-1 rounded"
    >
      Delete Node
    </button>
  </div>
</div>
  </div>
</div>
  );
}
