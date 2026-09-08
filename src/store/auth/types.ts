import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actionTypes';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface FormErrors {
  email?: string | null;
  password?: string | null;
}

export interface LoginFormUIProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBlurField: (field: 'email' | 'password') => void;
  loading: boolean;
  authError?: string | null;
  errors?: FormErrors;
  isSubmitting?: boolean;
}

// Action Payload Types
export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginSuccessPayload {
  token: string;
  user: User;
}

export type LoginFailurePayload = string;

// Action Interfaces
import { BaseAction } from '../common';
export type { BaseAction };

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: LoginRequestPayload;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: LoginFailurePayload;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

