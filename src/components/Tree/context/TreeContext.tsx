import { createContext, useContext } from "react";
import { TTreeNode } from "../tree.types";

export interface TreeContextState {
  data?: TTreeNode;
  selected?: TTreeNode;
  expandedIds: Record<string, boolean>;
}

export interface TreeContextValue extends TreeContextState {
  getId: (node?: TTreeNode) => string;
  onToggle: (node: TTreeNode) => void;
  onToggleAll: () => void;
  setSelected: (node: TTreeNode) => void;
}

const TreeContext = createContext<TreeContextValue>({
  expandedIds: {},
  getId: () => "",
  onToggle: () => {},
  onToggleAll: () => {},
  setSelected: () => {},
});

export function useTreeContext() {
  return useContext(TreeContext);
}

export default TreeContext;
