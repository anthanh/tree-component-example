import React from "react";

import styles from "./TreeNode.module.scss";
import { useTreeContext } from "../context/TreeContext";
import { FiPlusSquare, FiMinusSquare, FiFile, FiFolder } from "react-icons/fi";
import { TREE_NODE_KINDS, TTreeNode } from "../tree.types";

interface TreeNodeProps {
  node: TTreeNode;
  expanded?: boolean;
  selected?: boolean;
  path: number[];
  // onToggle: (id: string) => void,
  // onAdd: (id: string) => void,
  // onRemove: (id: string) => void,
}

const TreeNode = React.memo(
  ({ node, expanded, selected, path }: TreeNodeProps) => {
    const { name, children } = node;

    const {
      selected: selectedNode,
      getId,
      expandedIds,
      onToggle,
      setSelected,
    } = useTreeContext();

    const selectedId = getId(selectedNode);

    console.log("treenode", node.name, path);

    return (
      <div>
        <div
          className={`${styles.node} ${selected ? styles.active : ""}`}
          onClick={() => setSelected(node)}
        >
          <span
            className={`${styles.toggle} ${
              children?.length ? "" : styles.hidden
            }`}
            onClick={(evt) => {
              evt.preventDefault();
              evt.stopPropagation();
              onToggle(node);
            }}
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <FiMinusSquare /> : <FiPlusSquare />}
          </span>
          <span className={styles.kind}>
            {node.kind === TREE_NODE_KINDS.directory ? (
              <FiFolder />
            ) : (
              <FiFile />
            )}
          </span>
          <span>{name}</span>
        </div>
        {expanded ? (
          <div className={styles.children}>
            {children?.map((child, index) => {
              const childId = getId(child);
              const isExpanded = expandedIds[childId];
              const isSelected = selectedId === childId;
              return (
                <TreeNode
                  key={childId}
                  node={child}
                  expanded={isExpanded}
                  selected={isSelected}
                  path={[...path, index]}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
);

export default TreeNode;
