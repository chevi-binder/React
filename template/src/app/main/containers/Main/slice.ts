import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  ContainerState,
  MyTreeNode,
  NodeNameChanged,
  TreeErrorType,
} from './types';

// The initial state of the Main container
export const initialState: ContainerState = {
  loading: false,
  treeData: [],
  error: null,
  selectedNode: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    loadTreeData(state) {
      state.loading = true;
      state.error = null;
      state.treeData = [];
    },
    treeDataLoaded(state, action: PayloadAction<any[]>) {
      const repos = action.payload;
      state.treeData = repos;
      state.loading = false;
    },
    treeDataError(state, action: PayloadAction<TreeErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    nodeNameChanged(state, action: PayloadAction<NodeNameChanged>) {
      const changedNode = state.treeData[0];
      changedNode.Name = action.payload.newName;
    },
    nodeIsEditingChanged(state, action: PayloadAction<boolean>) {
      console.log('slice: nodeIsEditingChanged');
      const changedNode = state.treeData[0];
      changedNode.isEditing = action.payload;
    },
    setSelectedNode(state, action: PayloadAction<MyTreeNode>) {
      //console.log(`slice: selected node changed to: ${action.payload?.label}`);
      state.selectedNode = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = mainSlice;
