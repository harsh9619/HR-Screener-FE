import { all, fork } from 'redux-saga/effects';
import { authSaga } from './auth/saga';
import { rolesSaga } from './roles/saga';
import { candidatesSaga } from './candidates/saga';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(rolesSaga),
    fork(candidatesSaga),
  ]);
}
