import { createContext, useContext } from 'react'

import { type TTreeNode, type TTreeNodeKind } from '../tree.types'

export interface TreeContextState {
  data?: TTreeNode
  selected?: TTreeNode
  selectedPath?: number[]
  expandedIds: Record<string, boolean>
}

export interface TreeContextValue extends TreeContextState {
  getId: (node?: TTreeNode) => string
  onToggle: (node: TTreeNode) => void
  onToggleAll: () => void
  setSelected: (node: TTreeNode, path: number[]) => void
  addNode: (kind: TTreeNodeKind, path: number[]) => void
  updateNode: (node: TTreeNode, path: number[]) => void
}

const TreeContext = createContext<TreeContextValue>({
  expandedIds: {},
  getId: () => '',
  onToggle: () => {},
  onToggleAll: () => {},
  setSelected: () => {},
  addNode: () => {},
  updateNode: () => {}
})

export function useTreeContext () {
  return useContext(TreeContext)
}

export default TreeContext
