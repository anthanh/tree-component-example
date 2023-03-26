# tree-component-example

This is an example tree component in react TS.

## Setup

Install deps:

* With yarn
  ```
  yarn
  ```
* With npm
  ```
  npm i
  ```

## Run project

* With yarn
  ```
  yarn dev
  ```
* With npm
  ```
  npm run dev
  ```



### Usage

Data la estructura de datos de ejemplo definida en [data.mock.ts][src/data.mock.ts] , esposible renderizar un arbol navegable de directorios con el siguiente componente:

```
<Tree
  data={data}
  onSelect={handleSelect}
  getId={getId}
  draggable
  creatable
>
```

### Props

| name     | required           | type      | description                                             |
|----------|:------------------:|-----------|---------------------------------------------------------|
| data     | :white_check_mark: | TTreeNode | Recursive data structure that represents a tree model   |
| onSelect | :white_check_mark: | Function  | Triggered when node is selected or deselected           |
| getId    | :white_check_mark: | Function  | Required function to generate unique id's for each node |
| draggable| :x:                | boolean   | Enable DnD (false)                                      |
| creatable| :x:                | boolean   | Enable creation of new nodes (false)                    |


### How this works

los componentes principales de la aplicacion son:

TreeNodeBase as a parent component for common stuff

TreeNode
TreeLeaf

TreeContext para almacenar el estado global
- si hay alguno collapsado/uncollapsado (para saber si collapsar todos o no)
- metodos para collapsar todos o no
- mantener el nodo seleccionado


todos los componentes se memoizaran en base a sus nodos si esta collapsed o no y si esta seleccionado o no


We use css modules with sass to provide styles to the component but we can definely choose another strategy theme-based, or a component library like material-ui





## Future improvements

* Current `getId` cannot support repeated filenames or directory at different levels.
* Delegated `getChildren` and `render` methods so we can fully abstract tree render from treemodel and define its components with TS Generics.
* Re-render performance, try to avoid full tree render for subtree changes.
* 





