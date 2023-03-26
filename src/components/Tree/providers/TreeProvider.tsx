import React, { useState } from 'react'

import TreeContext, { type TreeContextState } from '../context/TreeContext'
import { getAllIds } from '../tree.helpers'
import { TREE_NODE_KINDS, type TTreeNode, type TTreeNodeKind } from '../tree.types'

const TreeProvider = ({
  data,
  getId,
  children
}: {
  data: TTreeNode
  getId: (node?: TTreeNode) => string
  children: React.ReactNode
}) => {
  const [treeContext, setTreeContext] = useState<TreeContextState>({
    expandedIds: {},
    data
  })

  const onToggle = (node: TTreeNode) => {
    const id = getId(node)
    setTreeContext({
      ...treeContext,
      expandedIds: {
        ...treeContext.expandedIds,
        [id]: !treeContext.expandedIds[id]
      }
    })
  }

  const onToggleAll = () => {
    setTreeContext({
      ...treeContext,
      // If all are expanded, collapse all, otherwise expand all
      expandedIds: Object.fromEntries(
        getAllIds(data, getId).map((id) => {
          if (
            (Object.values(treeContext.expandedIds).length > 0) &&
            Object.values(treeContext.expandedIds).every((v) => !!v)
          ) {
            return [id, false]
          } else {
            return [id, true]
          }
        })
      )
    })
  }

  const setSelected = (node: TTreeNode, path: number[]) => {
    const changedId = getId(node)
    setTreeContext({
      ...treeContext,
      selectedPath: path,
      selected:
        (treeContext.selected == null) || getId(treeContext.selected) !== changedId
          ? node
          : undefined
    })
  }

  const addNode = (kind: TTreeNodeKind, path: number[]) => {
    const isFile = kind === TREE_NODE_KINDS.file

    const newNode: TTreeNode = {
      name: isFile ? 'New File' : 'New Folder',
      kind,
      children: []
    }

    let anchorNode = treeContext.data!
    let parentNode = treeContext.data!
    path.forEach((index) => {
      parentNode = anchorNode
      anchorNode = anchorNode?.children?.[index] as TTreeNode
    })

    const newPath = [...path]
    const newExpandIds: Record<string, boolean> = {}
    // add nodes to files as siblings, to folders as children
    if (anchorNode.kind === TREE_NODE_KINDS.file) {
      parentNode.children = parentNode.children ?? []
      parentNode?.children.splice(parentNode?.children?.length || 0, 0, newNode)
      newPath[newPath.length - 1] = parentNode?.children?.length - 1
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      newNode.name += `${parentNode.name}-${parentNode.children.length}`
    } else {
      anchorNode?.children?.splice(anchorNode?.children?.length || 0, 0, newNode)
      newPath.splice(newPath.length, 0, (anchorNode?.children?.length ?? 0) - 1)
      newExpandIds[getId(anchorNode)] = true
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      newNode.name += `-${anchorNode.name}-${anchorNode?.children?.length}`
    }

    setTreeContext({ ...treeContext, selected: newNode, selectedPath: newPath, expandedIds: { ...treeContext.expandedIds, ...newExpandIds } })
  }

  return (
    <TreeContext.Provider
      value={{
        ...treeContext,
        getId,
        onToggle,
        onToggleAll,
        setSelected,
        addNode
      }}
    >
      {children}
    </TreeContext.Provider>
  )
}

export default TreeProvider
