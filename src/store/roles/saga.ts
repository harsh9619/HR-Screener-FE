import { takeLatest, call, put, StrictEffect } from 'redux-saga/effects';
import {
  FETCH_ROLES_REQUEST,
  FETCH_ROLE_BY_ID_REQUEST,
  CREATE_ROLE_REQUEST,
  UPDATE_ROLE_REQUEST,
  DELETE_ROLE_REQUEST,
} from './actionTypes';
import {
  fetchRolesSuccess,
  fetchRolesFailure,
  fetchRoleByIdRequest,
  fetchRoleByIdSuccess,
  fetchRoleByIdFailure,
  createRoleRequest,
  createRoleSuccess,
  createRoleFailure,
  updateRoleRequest,
  updateRoleSuccess,
  updateRoleFailure,
  deleteRoleRequest,
  deleteRoleSuccess,
  deleteRoleFailure,
} from './actions';
import { rolesService, RolesListResponse, RoleDetailResponse } from '../../services';
import { FetchRoleByIdRequestAction, FetchRolesRequestAction, CreateRoleRequestAction, UpdateRoleRequestAction, DeleteRoleRequestAction } from './types';

function* handleFetchRoles(): Generator<StrictEffect> {
  try {
    const response: RolesListResponse = yield call(rolesService.getRoles);
    yield put(fetchRolesSuccess(response.roles));
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to fetch roles.';
    yield put(fetchRolesFailure(message));
  }
}

function* handleFetchRoleById(action: FetchRoleByIdRequestAction): Generator<StrictEffect> {
  try {
    const response: RoleDetailResponse = yield call(rolesService.getRoleById, action.payload);
    yield put(fetchRoleByIdSuccess(response.role));
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to fetch role details.';
    yield put(fetchRoleByIdFailure(message));
  }
}

function* handleCreateRole(action: CreateRoleRequestAction): Generator<StrictEffect> {
  try {
    const res = yield call(rolesService.createRole, action.payload);
    yield put(createRoleSuccess({ roleId: res.roleId, message: res.message }));
    yield call(handleFetchRoles);
    if (action.callback) {
      action.callback(res.roleId);
    }
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to create role.';
    yield put(createRoleFailure(message));
  }
}

function* handleUpdateRole(action: UpdateRoleRequestAction): Generator<StrictEffect> {
  try {
    const { id, payload } = action.payload;
    yield call(rolesService.updateRole, id, payload);
    yield put(updateRoleSuccess());
    yield put(fetchRoleByIdRequest(id));
    if (action.callback) {
      action.callback();
    }
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to update role.';
    yield put(updateRoleFailure(message));
  }
}

function* handleDeleteRole(action: DeleteRoleRequestAction): Generator<StrictEffect> {
  try {
    yield call(rolesService.deleteRole, action.payload);
    yield put(deleteRoleSuccess(action.payload));
    if (action.callback) {
      action.callback();
    }
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to delete role.';
    yield put(deleteRoleFailure(message));
  }
}

export function* rolesSaga() {
  yield takeLatest(FETCH_ROLES_REQUEST, handleFetchRoles);
  yield takeLatest(FETCH_ROLE_BY_ID_REQUEST, handleFetchRoleById);
  yield takeLatest(CREATE_ROLE_REQUEST, handleCreateRole);
  yield takeLatest(UPDATE_ROLE_REQUEST, handleUpdateRole);
  yield takeLatest(DELETE_ROLE_REQUEST, handleDeleteRole);
}
