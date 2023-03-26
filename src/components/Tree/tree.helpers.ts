import { type TTreeNode } from './tree.types'

export function getAllIds (data: TTreeNode, getId: (node: TTreeNode) => string) {
  const ids: string[] = []
  function traverse (node: TTreeNode) {
    ids.push(getId(node))
    node.children?.forEach(traverse)
  }
  traverse(data)
  return ids
}
