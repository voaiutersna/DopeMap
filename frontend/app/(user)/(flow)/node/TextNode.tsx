import React, { useEffect, useRef, useState } from "react";
import { TextNodeData } from "../type";

export default function TextNode({
  data,
}: {
  data: TextNodeData;
}) {
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

  return (
    <div className="text-gray-300 relative flex justify-center items-center w-full">
      <p className="text-xl font-mono p-3 text-center bg-transparent focus:outline-none resize-none w-full overflow-hidden">
        {data.title || "Text Here"}
      </p>
    </div>
  );
}
