import { Node } from '@xyflow/react'
import React, { Dispatch, SetStateAction } from 'react'
import LinkEditor from './LinkEditor'
import TextEditor from './TextEditor'
import NoteEditor from './NoteEditor'
import TaskEditor from './TaskEditor'
import { NodeType } from '../test/type'


type CustomNode = Node & {
  type: NodeType;
};

const nodeTypesMap: Record<NodeType, React.FC<{ onClose: () => void }>> = {
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
  return <EditorComponent onClose={onClose} />;
}
