import { Node } from '@xyflow/react'
import React, { Dispatch, SetStateAction } from 'react'
import LinkEditor from './editor/LinkEditor'
import TextEditor from './editor/TextEditor'
import NoteEditor from './editor/NoteEditor'
import TaskEditor from './editor/TaskEditor'
import { NodeType } from '../type'
import { CustomNode } from '../type'

type EditorComponentProps = {
  onClose: () => void;
  node: CustomNode;
};

const nodeTypesMap: Record<NodeType, React.FC<EditorComponentProps>> = {
  note: NoteEditor,
  task: TaskEditor,
  link: LinkEditor,
  ctext: TextEditor,
};

export default function Editor({ editNode,setEditNodeId }: { editNode: CustomNode, setEditNodeId :  Dispatch<SetStateAction<string | null>>}) {
  const onClose = () => {
    setEditNodeId(null)
  }
const EditorComponent = nodeTypesMap[editNode.type];
  return <EditorComponent onClose={onClose} node={editNode}/>;
}
