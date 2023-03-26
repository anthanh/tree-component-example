export interface TTreeNode {
  name: string
  kind: TTreeNodeKind
  children?: TTreeNode[]
}

export const TREE_NODE_KINDS = {
  file: 'file',
  directory: 'directory'
} as const

// safer than string
export type TTreeNodeKind = keyof typeof TREE_NODE_KINDS
