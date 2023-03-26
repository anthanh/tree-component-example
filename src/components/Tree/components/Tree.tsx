import React from 'react'

import TreeProvider from '../providers/TreeProvider'
import { type TTreeNode } from '../tree.types'
import TreeContainer from './TreeContainer'

export interface TreeProps {
  data: TTreeNode
  onSelect?: (node: TTreeNode) => void
  getId: (node?: TTreeNode) => string
}

export const Tree = React.memo(({ data, getId, onSelect }: TreeProps) => {
  return (
    <TreeProvider data={data} getId={getId}>
      <TreeContainer data={data} onSelect={onSelect} />
    </TreeProvider>
  )
})

Tree.displayName = 'Tree'
