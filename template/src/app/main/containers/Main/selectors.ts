import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.main || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  mainState => mainState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  mainState => mainState.error,
);

export const selectTreeData = createSelector(
  [selectDomain],
  mainState => mainState.treeData,
);
