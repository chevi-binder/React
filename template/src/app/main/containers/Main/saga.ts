import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { actions } from './slice';
import { request } from 'utils/request';
import { TreeErrorType } from './types';

/**
 * Root saga manages watcher lifecycle
 */
export function* mainSaga() {
  // Watches for loadTreeData actions and calls getTreeData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadTreeData.type, getTreeData);
}

/**
 * TreeData request/response handler
 */
export function* getTreeData() {
  yield delay(500);
  const requestURL = `${process.env.REACT_APP_API_ADDRESS}/values`;
  console.log(requestURL);
  try {
    // Call our request helper (see 'utils/request')
    const treeData: any[] = yield call(request, requestURL);
    console.log(
      `tree data was loaded from server and contains ${treeData.length} items!`,
    );
    if (treeData?.length > 0) {
      yield put(actions.treeDataLoaded(treeData));
    } else {
      yield put(actions.treeDataError(TreeErrorType.EMPTY_DATA));
    }
  } catch (err) {
    console.log(`failed load data from server: ${JSON.stringify(err)}`);
    if (err.response?.status === 404) {
      yield put(actions.treeDataError(TreeErrorType.NOT_FOUND));
    } else {
      yield put(actions.treeDataError(TreeErrorType.RESPONSE_ERROR));
    }
  }
}
