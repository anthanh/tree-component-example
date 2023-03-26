import { ReactNode, useState } from "react";
import TreeContext, { TreeContextState } from "../context/TreeContext";
import { getAllIds } from "../tree.helpers";
import { TTreeNode } from "../tree.types";

const TreeProvider = ({
  data,
  getId,
  children,
}: {
  data: TTreeNode;
  getId: (node?: TTreeNode) => string;
  children: ReactNode;
}) => {
  const [treeContext, setTreeContext] = useState<TreeContextState>({
    expandedIds: {},
    data,
  });

  const onToggle = (node: TTreeNode) => {
    const id = getId(node);
    setTreeContext({
      ...treeContext,
      expandedIds: {
        ...treeContext.expandedIds,
        [id]: !treeContext.expandedIds[id],
      },
    });
  };

  const onToggleAll = () => {
    setTreeContext({
      ...treeContext,
      // If all are expanded, collapse all, otherwise expand all
      expandedIds: Object.fromEntries(
        getAllIds(data, getId).map((id) => {
          if (
            Object.values(treeContext.expandedIds).length &&
            Object.values(treeContext.expandedIds).every((v) => !!v)
          ) {
            return [id, false];
          } else {
            return [id, true];
          }
        })
      ),
    });
  };

  const setSelected = (node: TTreeNode) => {
    const changedId = getId(node);
    setTreeContext({
      ...treeContext,
      selected:
        !treeContext.selected || getId(treeContext.selected) !== changedId
          ? node
          : undefined,
    });
  };

  // const addNode = useCallback((node: TTreeNode) => {
  //   if (!treeContext.selected) return

  //   setTreeContext({
  //     ...treeContext,
  //     data: {
  //       ...treeContext.data,
  //       children: [...treeContext.data.children, node],
  //     },
  //   });
  // }, []);

  return (
    <TreeContext.Provider
      value={{
        ...treeContext,
        getId,
        onToggle,
        onToggleAll,
        setSelected,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export default TreeProvider;