import { Node, Edge }  from "@xyflow/react"
import { CustomNode } from "./(flow)/type";

export type ReactFlowData = {
  nodes: CustomNode[];
  edges: Edge[];
  viewport?: { x: number; y: number; zoom: number };
};

export type Roadmap = {
  id: string;
  title: string;
  description: string;
  authorId: number;
  enrolled: boolean;
  roadmap_data: ReactFlowData;
  created_at: string;
  is_public: boolean;
};

export type TaskHistory = {
  [taskId: string]: {
    isdone: boolean;
    isStar: boolean;
  };
};

export type HistoryType = {
  id: string;
  roadmap_id: string;
  roadmap_title: string;
  roadmap_description: string;
  task_history: TaskHistory;
  enrolled_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}