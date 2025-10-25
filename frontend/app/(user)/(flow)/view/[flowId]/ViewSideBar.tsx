import React from "react";

export default function ViewSidebar({ nodeData, historyData }) {
  if (!nodeData || !nodeData.nodes) {
    return (
      <aside className="py-10 p-4 bg-[#1e1f1f] border-l border-[#4b4f51] min-w-[220px] text-gray-300 font-mono">
        <p>No data available</p>
      </aside>
    );
  }

  // Only show nodes with type = "task"
  const taskNodes = nodeData.nodes.filter((n) => n.type === "task");

  return (
    <aside className="py-10 p-4 bg-[#1e1f1f] border-l border-[#4b4f51] min-w-[250px] text-gray-300 font-mono space-y-6">
      <h2 className="text-lg font-semibold text-gray-100">📋 Task Progress</h2>

      {taskNodes.map((node) => {
        const nodeId = node.id;
        const history = historyData?.[nodeId] || {};
        const tasks = node.data?.tasks || [];

        const total = tasks.length;
        const doneCount = tasks.filter(
          (task) => history?.[task.id]?.isdone
        ).length;

        return (
          <div key={nodeId} className="space-y-2">
            {/* Node title and done/total count */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-200">
                {node.data?.title || "Untitled Task Node"}
              </span>
              <span className="text-sm text-green-400">
                {doneCount} / {total} done
              </span>
            </div>

            {/* Task list */}
            <ul className="text-xs space-y-1 pl-2 mt-1">
              {tasks.map((task) => {
                const taskState = history?.[task.id];
                const isDone = taskState?.isdone;
                const isStar = taskState?.isStar;

                return (
                  <li key={task.id} className="flex items-center gap-2">
                    <span>
                      {isDone ? "✅" : "⬜"} {task.title || task.content || "Untitled"}
                    </span>
                    {isStar && <span className="text-yellow-400">★</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}
