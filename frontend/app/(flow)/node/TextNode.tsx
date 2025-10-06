import React, { useEffect, useRef, useState } from "react";
import { TextNodeData } from "../test/type";
import { Node } from "@xyflow/react";

export default function TextNode({ data , nodes , onNodeDataChange }: { data: TextNodeData ,nodes? : Node, onNodeDataChange?: () => void }) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState(data.title || "");

  const resizeTextArea = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextArea();
  }, [value]);

  useEffect(() => {
    const newdata : TextNodeData = {
      title : value
    }
  // onNodeDataChange(newdata)
  },[value])

  return (
    <div className="text-gray-300 relative flex justify-center items-center w-full">
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        className="text-xl font-mono p-3 text-center bg-transparent focus:outline-none resize-none w-full overflow-hidden"
      />
    </div>
  );
}