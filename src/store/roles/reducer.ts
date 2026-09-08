import * as types from './actionTypes';
import { RolesState, RolesActionTypes } from './types';

const initialState: RolesState = {
  list: [],
  selectedRole: null,
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
  success: null,
};

export const rolesReducer = (state = initialState, action: RolesActionTypes): RolesState => {
  switch (action.type) {
    case types.FETCH_ROLES_REQUEST:
    case types.FETCH_ROLE_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_ROLES_SUCCESS:
      return { ...state, loading: false, list: action.payload, error: null };

    case types.FETCH_ROLE_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedRole: action.payload, error: null };

    case types.FETCH_ROLES_FAILURE:
    case types.FETCH_ROLE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.CREATE_ROLE_REQUEST:
      return { ...state, creating: true, error: null, success: null };
    case types.CREATE_ROLE_SUCCESS:
      return { ...state, creating: false, success: action.payload.message || 'Role created successfully', error: null };
    case types.CREATE_ROLE_FAILURE:
      return { ...state, creating: false, error: action.payload, success: null };

    case types.UPDATE_ROLE_REQUEST:
      return { ...state, updating: true, error: null, success: null };
    case types.UPDATE_ROLE_SUCCESS:
      return { ...state, updating: false, success: 'Role updated successfully', error: null };
    case types.UPDATE_ROLE_FAILURE:
      return { ...state, updating: false, error: action.payload, success: null };

    case types.DELETE_ROLE_REQUEST:
      return { ...state, deleting: true, error: null, success: null };
    case types.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        deleting: false,
        list: state.list.filter((r) => r.id !== action.payload),
        selectedRole: state.selectedRole?.id === action.payload ? null : state.selectedRole,
        success: 'Role deleted successfully',
        error: null,
      };
    case types.DELETE_ROLE_FAILURE:
      return { ...state, deleting: false, error: action.payload, success: null };

    default:
      return state;
  }
};

