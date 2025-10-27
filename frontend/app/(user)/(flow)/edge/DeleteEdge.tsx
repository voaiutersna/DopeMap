import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
  useReactFlow,
} from '@xyflow/react';

interface DeleteEdgeProps extends EdgeProps {
  isEdit?: boolean;
}

export default function DeleteEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  isEdit = false,
  selected,
}: DeleteEdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

  const { setEdges } = useReactFlow();

  const onEdgeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent selecting the edge again
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />


        <EdgeLabelRenderer>
<div
  className="absolute nodrag nopan pointer-events-auto"
  style={{
    left: 0,
    top: 0,
    transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
  }}
>
  <div
    className={`transform transition-transform duration-300 ${
      isEdit && selected ? "scale-100" : "scale-0"
    }`}
  >
    <button
      onClick={onEdgeClick}
      className="w-5 h-5 bg-[#2f3131] border border-red-500 text-red-500 rounded-full text-sm flex items-center justify-center cursor-pointer"
    >
      ×
    </button>
  </div>
</div>
        </EdgeLabelRenderer>
    </>
  );
}
