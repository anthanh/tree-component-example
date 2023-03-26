import { FileNode } from "../../types";
import styles from "./NodeViewer.module.scss";

export default function NodeViewer({ data }: { data?: FileNode }) {
  if (!data)
    return (
      <div className={styles.root}>
        <h1>Select a node!</h1>
      </div>
    );
  return (
    <div className={styles.root}>
      <h1>{data?.name}</h1>
      <p>{data?.kind}</p>
      <p>{data?.size}</p>
      <p>{data?.modified}</p>
    </div>
  );
}
