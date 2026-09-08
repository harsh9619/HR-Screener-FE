import { Action } from 'redux';
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
import { CreateRolePayload, UpdateRolePayload } from '../../services';

export interface RoleRequirement {
  id?: string;
  roleId?: string;
  requirement: string;
  isMustHave: boolean;
  sortOrder?: number;
}

export interface Role {
  id: string;
  title: string;
  description: string;
  createdById: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  candidateCount?: number;
  reviewCount?: number;
  requirements?: RoleRequirement[];
}

export interface RolesState {
  list: Role[];
  selectedRole: Role | null;
  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string | null;
  success: string | null;
}

export interface RoleCardUIProps {
  role: Role;
  onDelete?: (id: string) => void;
}


export interface RequirementInput {
  requirement: string;
  isMustHave: boolean;
}

export interface RoleFormModalUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  requirements: RequirementInput[];
  setRequirements: React.Dispatch<React.SetStateAction<RequirementInput[]>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

// Action Payload Types
export type FetchRolesSuccessPayload = Role[];
export type FetchRolesFailurePayload = string;

export type FetchRoleByIdRequestPayload = string;
export type FetchRoleByIdSuccessPayload = Role;
export type FetchRoleByIdFailurePayload = string;

export type CreateRoleRequestPayload = CreateRolePayload;
export interface CreateRoleSuccessPayload {
  roleId: string;
  message: string;
}
export type CreateRoleFailurePayload = string;

export interface UpdateRoleRequestPayload {
  id: string;
  payload: UpdateRolePayload;
}
export type UpdateRoleFailurePayload = string;

export type DeleteRoleRequestPayload = string;
export type DeleteRoleSuccessPayload = string;
export type DeleteRoleFailurePayload = string;

// Action Interfaces
import { BaseAction } from '../common';

export interface FetchRolesRequestAction extends BaseAction<typeof FETCH_ROLES_REQUEST> {
  type: typeof FETCH_ROLES_REQUEST;
}

export interface FetchRolesSuccessAction extends BaseAction<typeof FETCH_ROLES_SUCCESS> {
  type: typeof FETCH_ROLES_SUCCESS;
  payload: FetchRolesSuccessPayload;
}

export interface FetchRolesFailureAction extends BaseAction<typeof FETCH_ROLES_FAILURE> {
  type: typeof FETCH_ROLES_FAILURE;
  payload: FetchRolesFailurePayload;
}

export interface FetchRoleByIdRequestAction extends BaseAction<typeof FETCH_ROLE_BY_ID_REQUEST> {
  type: typeof FETCH_ROLE_BY_ID_REQUEST;
  payload: FetchRoleByIdRequestPayload;
}

export interface FetchRoleByIdSuccessAction extends BaseAction<typeof FETCH_ROLE_BY_ID_SUCCESS> {
  type: typeof FETCH_ROLE_BY_ID_SUCCESS;
  payload: FetchRoleByIdSuccessPayload;
}

export interface FetchRoleByIdFailureAction extends BaseAction<typeof FETCH_ROLE_BY_ID_FAILURE> {
  type: typeof FETCH_ROLE_BY_ID_FAILURE;
  payload: FetchRoleByIdFailurePayload;
}

export interface CreateRoleRequestAction extends BaseAction<typeof CREATE_ROLE_REQUEST> {
  type: typeof CREATE_ROLE_REQUEST;
  payload: CreateRoleRequestPayload;
  callback?: (roleId: string) => void;
}

export interface CreateRoleSuccessAction extends BaseAction<typeof CREATE_ROLE_SUCCESS> {
  type: typeof CREATE_ROLE_SUCCESS;
  payload: CreateRoleSuccessPayload;
}

export interface CreateRoleFailureAction extends BaseAction<typeof CREATE_ROLE_FAILURE> {
  type: typeof CREATE_ROLE_FAILURE;
  payload: CreateRoleFailurePayload;
}

export interface UpdateRoleRequestAction extends BaseAction<typeof UPDATE_ROLE_REQUEST> {
  type: typeof UPDATE_ROLE_REQUEST;
  payload: UpdateRoleRequestPayload;
  callback?: () => void;
}

export interface UpdateRoleSuccessAction extends BaseAction<typeof UPDATE_ROLE_SUCCESS> {
  type: typeof UPDATE_ROLE_SUCCESS;
}

export interface UpdateRoleFailureAction extends BaseAction<typeof UPDATE_ROLE_FAILURE> {
  type: typeof UPDATE_ROLE_FAILURE;
  payload: UpdateRoleFailurePayload;
}

export interface DeleteRoleRequestAction extends BaseAction<typeof DELETE_ROLE_REQUEST> {
  type: typeof DELETE_ROLE_REQUEST;
  payload: DeleteRoleRequestPayload;
  callback?: () => void;
}

export interface DeleteRoleSuccessAction extends BaseAction<typeof DELETE_ROLE_SUCCESS> {
  type: typeof DELETE_ROLE_SUCCESS;
  payload: DeleteRoleSuccessPayload;
}

export interface DeleteRoleFailureAction extends BaseAction<typeof DELETE_ROLE_FAILURE> {
  type: typeof DELETE_ROLE_FAILURE;
  payload: DeleteRoleFailurePayload;
}

export type RolesActionTypes =
  | FetchRolesRequestAction
  | FetchRolesSuccessAction
  | FetchRolesFailureAction
  | FetchRoleByIdRequestAction
  | FetchRoleByIdSuccessAction
  | FetchRoleByIdFailureAction
  | CreateRoleRequestAction
  | CreateRoleSuccessAction
  | CreateRoleFailureAction
  | UpdateRoleRequestAction
  | UpdateRoleSuccessAction
  | UpdateRoleFailureAction
  | DeleteRoleRequestAction
  | DeleteRoleSuccessAction
  | DeleteRoleFailureAction;


