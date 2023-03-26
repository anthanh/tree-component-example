
import React, { useCallback, useState } from 'react'
import Split from 'react-split'

import styles from './App.module.scss'
import { type FileNode } from './app.types'
import { NodeViewer } from './components/NodeViewer'
import { Tree } from './components/Tree'
import { mockData } from './data.mock'

function App () {
  const [selected, setSelected] = useState<FileNode | undefined>(undefined)

  const handleSelect = useCallback(
    (selected: FileNode) => { setSelected(selected) },
    []
  )

  const getId = useCallback(
    (node?: FileNode) => (node != null) ? `${node?.name}-${node?.kind}` : '',
    []
  )

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
  )
}

export default App
