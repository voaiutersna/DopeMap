export type NodeType = 'note' | 'task' | 'link' | 'ctext';
export  type NoteNodeData = {
  label: string;
};

export  type TextNodeData = {
  title: string;
};

export type TaskNodeData = {
  title : string
  tasks : Task [] 
}

export type LinkNodeData = {
  title : string
  url : string
}

export type Task = {
title : string
description : string
content : string
taskUrl : string
types: string[]
difficult : string
dificultScore : number
solutionUrl : string
}
