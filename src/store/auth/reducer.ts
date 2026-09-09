import * as types from './actionTypes';
import { AuthState, AuthActionTypes } from './types';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };

    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case types.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      };

    default:
      return state;
  }
};
