import { Node } from '@xyflow/react'
import React from 'react'
import LinkEditor from './LinkEditor'
import TextEditor from './TextEditor'
import NoteEditor from './NoteEditor'
import TaskEditor from './TaskEditor'
import { NodeType } from '../test/type'


type CustomNode = Node & {
  type: NodeType;
};

const nodeTypesMap: Record<NodeType, React.JSX.Element> = {
  note: <NoteEditor />,
  task: <TaskEditor />,
  link: <LinkEditor />,
  ctext: <TextEditor />,
};

export default function Editor({ editNode }: { editNode: CustomNode }) {
  return nodeTypesMap[editNode.type];
}
