import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { NodeType } from './type';

type DnDContextType = [NodeType | null, Dispatch<SetStateAction<NodeType | null>>];

const DnDContext = createContext<DnDContextType | undefined>(undefined);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<NodeType | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = () => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};

export default DnDContext;
