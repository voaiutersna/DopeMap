import React, { useState } from 'react';
import { CustomNode } from '../../type';
import { useReactFlow } from '@xyflow/react';
import Header from './components/Header';

type LinkEditorProps = {
  onClose: () => void;
  node: CustomNode;
};

export default function LinkEditor({ onClose, node }: LinkEditorProps) {
  const { setNodes } = useReactFlow();
  const [title, setTitle] = useState(node?.data?.title ?? "");
  const [url, setUrl] = useState(node?.data?.url ?? "");

  const handleSave = () => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              data: {
                ...n.data,
                title,
                url,
              },
            }
          : n
      )
    );

    onClose();
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 font-mono py-8 sm:py-12">
      <div className="flex flex-col gap-4">
        <Header headerTitle={"Edit Url Node"} onClose={onClose} />

        <div className="flex flex-col space-y-6">
          {/* Title */}
          <label className="flex flex-col space-y-2 sm:space-y-3 text-sm sm:text-base">
            <span className="text-gray-500 sm:text-sm">Title</span>
            <input
              type="text"
              value={title as string}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="border border-gray-500 rounded-sm px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-0"
            />
          </label>

          {/* URL */}
          <label className="flex flex-col space-y-2 sm:space-y-3 text-sm sm:text-base">
            <span className="text-gray-500 sm:text-sm">URL</span>
            <input
              type="url"
              value={url as string}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="border border-gray-500 rounded-sm px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-0"
            />
          </label>
        </div>

        {/* Save button */}
        <div className="mt-4 sm:mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-blue-600/90 text-blue-600 rounded-sm hover:bg-blue-700/10 cursor-pointer hover:scale-105 duration-200 text-sm sm:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
