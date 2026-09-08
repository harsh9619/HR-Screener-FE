import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actionTypes';
import {
  LoginRequestPayload,
  LoginSuccessPayload,
  LoginFailurePayload,
  LoginRequestAction,
  LoginSuccessAction,
  LoginFailureAction,
  LogoutAction,
} from './types';

export const loginRequest = (payload: LoginRequestPayload): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: LoginFailurePayload): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});


