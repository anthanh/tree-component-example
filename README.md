# tree-component-example

This is an example tree component in React TS.


![](demo.gif)

## Setup

- With yarn
  ```
  yarn
  ```
- With npm
  ```
  npm i
  ```

## Run project

- With yarn
  ```
  yarn dev
  ```
- With npm
  ```
  npm run dev
  ```

## Usage

Given the example data structure defined in [data.mock.ts](src/data.mock.ts), it is possible to render a navigable tree of directories with the following component:

```
<Tree
  data={data}
  onSelect={handleSelect}
  getId={getId}
>
```

In addition, the component offers actions at the top such as:

* Expand, collapse all nodes
* Add new files/directories

## Props

| name     |      required      | type      | description                                             |
| -------- | :----------------: | --------- | ------------------------------------------------------- |
| data     | :white_check_mark: | TTreeNode | Recursive data structure that represents a tree model   |
| onSelect | :white_check_mark: | Function  | Triggered when node is selected or deselected           |
| getId    | :white_check_mark: | Function  | Required function to generate unique id's for each node |

## Design notes
The main components of the application are:

* **TreeNode**: represents a tree node, whether it is a node or a leaf.
* **TreeContainer**: renders the possible actions and initializes the root node.
* **TreeContext/TreeProvider**: represents the shared state for a particular tree and the allowed state mutations. It is the source of truth for the Tree.

And secondarily, it is also worth mentioning these components:

* **NodeViewer**: a naive example of rendering any node
* **App**: provides the split layout with the main components of the application, Tree and NodeViewer.

Tree is mainly supported by 2 pieces, the `TreeNode` as a recursive Component that navigates through the data structure, and the `TreeContext` that provides source of truth and state mutation.

To manage the state, it is important that the consumer defines a `getId` function to identify any node of the tree, as the rest of the operations rely on this.

For example, the expanded state is defined as a hashmap of nodeIds/booleans so we can directly access its state. Also, the expand/collapse changes all these IDs to the desired state.

There is also an interesting concept of `path` as a `number[]` that every node knows at render-time, so we can programmatically navigate to a specific node of the tree. This is mainly used by the creation or update of nodes. This is also important since, depending on the selected target-node at creation, we may create the new node as a sibling or child.

Finally, `TreeNodes` have the ability to edit their names by double-clicking their names, which will be saved on blur.

We use CSS modules with SASS to provide styles to the component, but we can definitely choose another strategy theme-based, or a component library like Material-UI. This is a simple solution that avoids class collision and also enforces file colocation.

The project is configured with a linter and formatter to enforce best practices.

## Future improvements

- Current `getId` cannot support repeated filenames or directory at different levels. We could try to integrate the tree path in the id generation to avoid name collisions. A simple workaround I have applied in this example is to ensure new nodes have unique default names.
- Delegated `getChildren` and `render` methods so we can fully abstract tree-renderer from tree-model and define its components with TS Generics.
- Re-render performance, try to avoid full tree render for subtree changes. Maybe migrating the shared Tree state from context to useReducer could help.
- new nodes should be compliant with the consumer datamodel (files, directories), so we can define better defaults for each kind.
- creatable/draggable as optional features
- loader state
- search input to filter nodes
