import React, { useEffect } from 'react'
import {
  VscCollapseAll,
  VscExpandAll
  // VscNewFile,
  // VscNewFolder,
} from 'react-icons/vsc'

import { useTreeContext } from '../context/TreeContext'
import { type TTreeNode } from '../tree.types'
import styles from './TreeContainer.module.scss'
import TreeNode from './TreeNode'

const TreeContainer = React.memo(
  ({
    data,
    onSelect
  }: {
    data: TTreeNode
    onSelect?: (node: TTreeNode) => void
  }) => {
    const { selected, getId, expandedIds, onToggleAll } = useTreeContext()

    const nodeId = getId(data)
    const selectedId = getId(selected)
    const isSelected = selectedId === nodeId
    const isExpanded = expandedIds[nodeId]

    useEffect(() => {
      if (selected != null) {
        onSelect?.(selected)
      }
    }, [selected, onSelect])

    return (
      <div className={styles.root}>
        <div className={styles.actions}>
          {/* <VscNewFolder onClick={onToggleAll} title="Add folder" />
          <VscNewFile onClick={onToggleAll} title="Add file" /> */}
          {(Object.values(expandedIds).length > 0) && Object.values(expandedIds).every((v) => !!v)
            ? (
            <VscCollapseAll onClick={onToggleAll} title="Collapse all" />
              )
            : (
            <VscExpandAll onClick={onToggleAll} title="Expand all" />
              )}
        </div>
        <TreeNode
          node={data}
          expanded={isExpanded}
          selected={isSelected}
          path={[]}
        />
      </div>
    )
  }
)

TreeContainer.displayName = 'TreeContainer'

export default TreeContainer
