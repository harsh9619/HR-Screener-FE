import httpService from './http.service';
import { Role } from '../store/roles/types';

export interface RolesListResponse {
  roles: Role[];
}

export interface RoleDetailResponse {
  role: Role;
}

export interface CreateRolePayload {
  title: string;
  description: string;
  requirements: { requirement: string; isMustHave?: boolean }[];
}

export interface UpdateRolePayload {
  title?: string;
  description?: string;
  isActive?: boolean;
  requirements?: { requirement: string; isMustHave?: boolean }[];
}

export const rolesService = {
  getRoles: async (): Promise<RolesListResponse> => {
    const response = await httpService.get<RolesListResponse>('/roles');
    return response.data;
  },

  getRoleById: async (id: string): Promise<RoleDetailResponse> => {
    const response = await httpService.get<RoleDetailResponse>(`/roles/${id}`);
    return response.data;
  },

  createRole: async (payload: CreateRolePayload): Promise<{ message: string; roleId: string }> => {
    const response = await httpService.post<{ message: string; roleId: string }>('/roles', payload);
    return response.data;
  },

  updateRole: async (id: string, payload: UpdateRolePayload): Promise<{ message: string }> => {
    const response = await httpService.patch<{ message: string }>(`/roles/${id}`, payload);
    return response.data;
  },

  deleteRole: async (id: string): Promise<{ message: string }> => {
    const response = await httpService.delete<{ message: string }>(`/roles/${id}`);
    return response.data;
  },
};
