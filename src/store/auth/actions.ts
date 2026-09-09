import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from './actionTypes';
import {
  LoginRequestPayload,
  RegisterRequestPayload,
  LoginSuccessPayload,
  LoginFailurePayload,
  RegisterFailurePayload,
  LoginRequestAction,
  LoginSuccessAction,
  LoginFailureAction,
  RegisterRequestAction,
  RegisterSuccessAction,
  RegisterFailureAction,
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

export const registerRequest = (payload: RegisterRequestPayload): RegisterRequestAction => ({
  type: REGISTER_REQUEST,
  payload,
});

export const registerSuccess = (payload: LoginSuccessPayload): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (payload: RegisterFailurePayload): RegisterFailureAction => ({
  type: REGISTER_FAILURE,
  payload,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});
