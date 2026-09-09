import { call, put, takeLatest, StrictEffect } from 'redux-saga/effects';
import { LOGIN_REQUEST, REGISTER_REQUEST } from './actionTypes';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from './actions';
import { authService } from '../../services';
import type { LoginRequestAction, RegisterRequestAction, LoginSuccessPayload } from './types';

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

function* handleRegister(action: RegisterRequestAction): Generator<StrictEffect> {
  try {
    const { email, password, name } = action.payload;
    const response: LoginSuccessPayload = yield call(authService.register, email, password, name);
    yield put(registerSuccess({ token: response.token, user: response.user }));
  } catch (error: any) {
    const message = error.response?.data?.error || 'Registration failed.';
    yield put(registerFailure(message));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
