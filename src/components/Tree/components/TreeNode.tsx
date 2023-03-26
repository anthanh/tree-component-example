import React, { useState } from 'react'
import { FiFile, FiFolder, FiMinusSquare, FiPlusSquare } from 'react-icons/fi'

import { useTreeContext } from '../context/TreeContext'
import { TREE_NODE_KINDS, type TTreeNode } from '../tree.types'
import styles from './TreeNode.module.scss'

interface TreeNodeProps {
  node: TTreeNode
  expanded?: boolean
  selected?: boolean
  path: number[]
}

const TreeNode = React.memo(
  ({ node, expanded, selected, path }: TreeNodeProps) => {
    const { name, children } = node

    const {
      selected: selectedNode,
      getId,
      expandedIds,
      onToggle,
      setSelected,
      updateNode
    } = useTreeContext()

    const [isEditing, setIsEditing] = useState(false)

    const selectedId = getId(selectedNode)

    return (
      <div>
        <div
          className={`${styles.node} ${selected ? styles.active : ''}`}
          onClick={() => { setSelected(node, path) }}
        >
          <span
            className={`${styles.toggle} ${
              children?.length ? '' : styles.hidden
            }`}
            onClick={(evt) => {
              evt.preventDefault()
              evt.stopPropagation()
              onToggle(node)
            }}
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <FiMinusSquare /> : <FiPlusSquare />}
          </span>
          <span className={styles.kind}>
            {node.kind === TREE_NODE_KINDS.directory
              ? (
              <FiFolder />
                )
              : (
              <FiFile />
                )}
          </span>
          <span
          className={styles.name}
          contentEditable={isEditing} suppressContentEditableWarning
            onBlur={e => {
              updateNode({ ...node, name: e.currentTarget.textContent ?? node.name }, path)
              setIsEditing(false)
            }}
            onDoubleClick={() => { setIsEditing(true) }}
          >{name}</span>
        </div>
        {expanded
          ? (
          <div className={styles.children}>
            {children?.map((child, index) => {
              const childId = getId(child)
              const isExpanded = expandedIds[childId]
              const isSelected = selectedId === childId
              return (
                <TreeNode
                  key={childId}
                  node={child}
                  expanded={isExpanded}
                  selected={isSelected}
                  path={[...path, index]}
                />
              )
            })}
          </div>
            )
          : null}
      </div>
    )
  }
)

TreeNode.displayName = 'TreeNode'

export default TreeNode
