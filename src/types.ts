import { type TTreeNode } from './components/Tree/tree.types'

export interface FileNode extends TTreeNode {
  size?: string
  modified?: string
  children?: FileNode[]
}
