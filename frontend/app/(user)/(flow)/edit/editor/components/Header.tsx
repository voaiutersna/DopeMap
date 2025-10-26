import { X } from 'lucide-react'
import React from 'react'

export default function Header({onClose , headerTitle} : {onClose: () => void , headerTitle : string}) {
  return (
      <div className="flex w-full justify-between items-center">
          <h1 className="text-lg font-semibold">{headerTitle}</h1>
          <X
            className="w-5 h-5 text-red-500/80 cursor-pointer bg-red-900/10 rounded-full"
            onClick={onClose}
          />
        </div>
  )
}
