import React from 'react'
import Flow from '../../Flow'
import ViewSidebar from './ViewSideBar'

const nodeData = {
  nodes: [
    {
      id: "1f3be93b-55bd-4282-92d8-faf97af40416",
      type: "task",
      data: {
        title: "Frontend Tasks",
        tasks: [
          { id: "t1", content: "Setup project" },
          { id: "t2", content: "Build UI" },
          { id: "t3", content: "Write tests" },
        ],
      },
    },
  ],
};

const historyData = {
  "1f3be93b-55bd-4282-92d8-faf97af40416": {
    t1: { isdone: true, isStar: true },
    t2: { isdone: false, isStar: false },
    t3: { isdone: true, isStar: false },
  },
};

export default function ViewPage() {
  return (
   <div>
      <Flow isEdit={false}/>
    </div>
  )
}
