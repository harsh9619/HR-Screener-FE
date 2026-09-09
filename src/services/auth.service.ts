import httpService from './http.service';
import { LoginSuccessPayload } from '../store/auth/types';


export const authService = {
  login: async (email: string, password: string): Promise<LoginSuccessPayload> => {
    const response = await httpService.post<LoginSuccessPayload>('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name: string): Promise<LoginSuccessPayload> => {
    const response = await httpService.post<LoginSuccessPayload>('/auth/register', { email, password, name });
    return response.data;
  },
};

