import React from 'react'

import { type FileNode } from '../../types'
import styles from './NodeViewer.module.scss'

export function NodeViewer ({ data }: { data?: FileNode }) {
  if (data == null) {
    return (
      <div className={styles.root}>
        <h1>Select a node!</h1>
      </div>
    )
  }
  return (
    <div className={styles.root}>
      <h1>{data?.name}</h1>
      <p>{data?.kind}</p>
      <p>{data?.size}</p>
      <p>{data?.modified}</p>
    </div>
  )
}
