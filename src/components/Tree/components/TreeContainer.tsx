import styles from "./TreeContainer.module.scss";
import {
  VscExpandAll,
  VscCollapseAll,
  // VscNewFile,
  // VscNewFolder,
} from "react-icons/vsc";
import { TTreeNode } from "../tree.types";
import { useTreeContext } from "../context/TreeContext";
import TreeNode from "./TreeNode";
import React, { useEffect } from "react";

const TreeContainer = React.memo(
  ({
    data,
    onSelect,
  }: {
    data: TTreeNode;
    onSelect?: (node: TTreeNode) => void;
  }) => {
    const { selected, getId, expandedIds, onToggleAll } = useTreeContext();

    const nodeId = getId(data);
    const selectedId = getId(selected);
    const isSelected = selectedId === nodeId;
    const isExpanded = expandedIds[nodeId];

    useEffect(() => {
      if (selected) {
        onSelect?.(selected);
      }
    }, [selected]);

    return (
      <div className={styles.root}>
        <div className={styles.actions}>
          {/* <VscNewFolder onClick={onToggleAll} title="Add folder" />
          <VscNewFile onClick={onToggleAll} title="Add file" /> */}
          {Object.values(expandedIds).length && Object.values(expandedIds).every((v) => !!v) ? (
            <VscCollapseAll onClick={onToggleAll} title="Collapse all" />
          ) : (
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
    );
  }
);

export default TreeContainer;
