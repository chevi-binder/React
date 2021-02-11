//import TreeNode from 'primereact/components/treenode/TreeNode';

/* --- STATE --- */
export interface MainState {
  treeData: any[];
  loading: boolean;
  error?: TreeErrorType | null;
  selectedNode?: MyTreeNode | null;
}
export enum TreeErrorType {
  RESPONSE_ERROR = 1,
  EMPTY_DATA,
  NOT_FOUND,
}

export interface NodeNameChanged {
  key: string;
  newName: string;
}

export type ContainerState = MainState;

export interface MyTreeNode {
  //extends TreeItem  {
  key: number;
  label: string;
  isEditing: boolean;
  children: MyTreeNode[];
}
