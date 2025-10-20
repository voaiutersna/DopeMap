import type { Node } from "@xyflow/react";

export type NodeType = "note" | "task" | "link" | "ctext";

export type NoteNodeData = {
  label: string;
  content : string;
};

export type TextNodeData = {
  title: string;
};

export type TaskNodeData = {
  title: string;
  tasks: Task[];
};

export type LinkNodeData = {
  title: string;
  url: string;
};

export type Task = {
  title: string;
  description: string;
  content: string;
  taskUrl: string;
  types: string[];
  difficult: string;
  dificultScore: number;
  solutionUrl: string;
};

// 🎯 CustomNode Type with correct data for each type
export type CustomNode =
  | (Node & {
      type: "note";
      data: NoteNodeData;
    })
  | (Node & {
      type: "ctext";
      data: TextNodeData;
    })
  | (Node & {
      type: "task";
      data: TaskNodeData;
    })
  | (Node & {
      type: "link";
      data: LinkNodeData;
    });
