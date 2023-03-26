import styles from "./App.module.scss";
import Tree from "./components/Tree";
import { mockData } from "./data.mock";
import Split from "react-split";
import NodeViewer from "./components/NodeViewer";
import { useCallback, useState } from "react";
import { FileNode } from "./types";

function App() {

const [selected, setSelected] = useState<FileNode | undefined>(undefined);

  const handleSelect = useCallback(
    (selected: FileNode) => setSelected(selected),
    []
  );

  const getId = useCallback(
    (node?: FileNode) => node? `${node?.name}-${node?.kind}`: '',
    []
  );

  return (
    <div className={styles.root}>
      <Split className={styles.split}>
        <div>
          <Tree data={mockData} onSelect={handleSelect} getId={getId} />
        </div>
        <div>
          <NodeViewer data={selected}></NodeViewer>
        </div>
      </Split>
    </div>
  );
}

export default App;
