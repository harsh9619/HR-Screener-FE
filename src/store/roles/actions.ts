import {
  FETCH_ROLES_REQUEST,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  FETCH_ROLE_BY_ID_REQUEST,
  FETCH_ROLE_BY_ID_SUCCESS,
  FETCH_ROLE_BY_ID_FAILURE,
  CREATE_ROLE_REQUEST,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
} from './actionTypes';
import {
  FetchRolesSuccessPayload,
  FetchRolesFailurePayload,
  FetchRoleByIdRequestPayload,
  FetchRoleByIdSuccessPayload,
  FetchRoleByIdFailurePayload,
  CreateRoleRequestPayload,
  CreateRoleSuccessPayload,
  CreateRoleFailurePayload,
  UpdateRoleRequestPayload,
  UpdateRoleFailurePayload,
  DeleteRoleRequestPayload,
  DeleteRoleSuccessPayload,
  DeleteRoleFailurePayload,
  FetchRolesRequestAction,
  FetchRolesSuccessAction,
  FetchRolesFailureAction,
  FetchRoleByIdRequestAction,
  FetchRoleByIdSuccessAction,
  FetchRoleByIdFailureAction,
  CreateRoleRequestAction,
  CreateRoleSuccessAction,
  CreateRoleFailureAction,
  UpdateRoleRequestAction,
  UpdateRoleSuccessAction,
  UpdateRoleFailureAction,
  DeleteRoleRequestAction,
  DeleteRoleSuccessAction,
  DeleteRoleFailureAction,
} from './types';

export const fetchRolesRequest = (): FetchRolesRequestAction => ({
  type: FETCH_ROLES_REQUEST,
});

export const fetchRolesSuccess = (payload: FetchRolesSuccessPayload): FetchRolesSuccessAction => ({
  type: FETCH_ROLES_SUCCESS,
  payload,
});

export const fetchRolesFailure = (payload: FetchRolesFailurePayload): FetchRolesFailureAction => ({
  type: FETCH_ROLES_FAILURE,
  payload,
});

export const fetchRoleByIdRequest = (payload: FetchRoleByIdRequestPayload): FetchRoleByIdRequestAction => ({
  type: FETCH_ROLE_BY_ID_REQUEST,
  payload,
});

export const fetchRoleByIdSuccess = (payload: FetchRoleByIdSuccessPayload): FetchRoleByIdSuccessAction => ({
  type: FETCH_ROLE_BY_ID_SUCCESS,
  payload,
});

export const fetchRoleByIdFailure = (payload: FetchRoleByIdFailurePayload): FetchRoleByIdFailureAction => ({
  type: FETCH_ROLE_BY_ID_FAILURE,
  payload,
});

export const createRoleRequest = (
  payload: CreateRoleRequestPayload,
  callback?: (roleId: string) => void
): CreateRoleRequestAction => ({
  type: CREATE_ROLE_REQUEST,
  payload,
  callback,
});

export const createRoleSuccess = (payload: CreateRoleSuccessPayload): CreateRoleSuccessAction => ({
  type: CREATE_ROLE_SUCCESS,
  payload,
});

export const createRoleFailure = (payload: CreateRoleFailurePayload): CreateRoleFailureAction => ({
  type: CREATE_ROLE_FAILURE,
  payload,
});

export const updateRoleRequest = (
  payload: UpdateRoleRequestPayload,
  callback?: () => void
): UpdateRoleRequestAction => ({
  type: UPDATE_ROLE_REQUEST,
  payload,
  callback,
});

export const updateRoleSuccess = (): UpdateRoleSuccessAction => ({
  type: UPDATE_ROLE_SUCCESS,
});

export const updateRoleFailure = (payload: UpdateRoleFailurePayload): UpdateRoleFailureAction => ({
  type: UPDATE_ROLE_FAILURE,
  payload,
});

export const deleteRoleRequest = (
  payload: DeleteRoleRequestPayload,
  callback?: () => void
): DeleteRoleRequestAction => ({
  type: DELETE_ROLE_REQUEST,
  payload,
  callback,
});

export const deleteRoleSuccess = (payload: DeleteRoleSuccessPayload): DeleteRoleSuccessAction => ({
  type: DELETE_ROLE_SUCCESS,
  payload,
});

export const deleteRoleFailure = (payload: DeleteRoleFailurePayload): DeleteRoleFailureAction => ({
  type: DELETE_ROLE_FAILURE,
  payload,
});



