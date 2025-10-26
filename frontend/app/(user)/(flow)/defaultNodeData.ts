import type { NoteNodeData, TextNodeData, TaskNodeData, LinkNodeData } from "./type";

export const defaultNoteNodeData: NoteNodeData = {
  label: "Note Here",
  content: "",
};

export const defaultTextNodeData: TextNodeData = {
  title: "Text Here",
};

export const defaultTaskNodeData: TaskNodeData = {
  title: "Task Here",
};

export const defaultLinkNodeData: LinkNodeData = {
  title: "Link Here",
  url: "https://example.com",
};