import { call, put, takeLatest, StrictEffect } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './actionTypes';
import { loginSuccess, loginFailure } from './actions';
import { authService } from '../../services';
import type { LoginRequestAction, LoginSuccessPayload } from './types';


function* handleLogin(action: LoginRequestAction): Generator<StrictEffect> {
  try {
    const { email, password } = action.payload;
    const response: LoginSuccessPayload = yield call(authService.login, email, password);
    yield put(loginSuccess({ token: response.token, user: response.user }));
  } catch (error: any) {
    const message = error.response?.data?.error || 'Login failed.';
    yield put(loginFailure(message));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
