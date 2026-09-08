import httpService from './http.service';
import { CandidateSummary, CandidateDetail, ComparisonResult } from '../store/candidates/types';

export interface CandidatesListResponse {
  candidates: CandidateSummary[];
}

export interface CandidateDetailResponse {
  candidate: CandidateDetail;
}

export interface CreateCandidatePayload {
  name: string;
  email: string;
  resumeText: string;
}

export interface CreateCandidateResponse {
  message: string;
  candidateId: string;
  integrityStatus: 'clear' | 'review';
  fitScore: number;
}

export const candidatesService = {
  getCandidatesByRole: async (
    roleId: string,
    params?: { sortBy?: string; order?: string; search?: string }
  ): Promise<CandidatesListResponse> => {
    const response = await httpService.get<CandidatesListResponse>(`/roles/${roleId}/candidates`, { params });
    return response.data;
  },

  getCandidateById: async (id: string): Promise<CandidateDetailResponse> => {
    const response = await httpService.get<CandidateDetailResponse>(`/candidates/${id}`);
    return response.data;
  },

  createCandidate: async (
    roleId: string,
    payload: CreateCandidatePayload
  ): Promise<CreateCandidateResponse> => {
    const response = await httpService.post<CreateCandidateResponse>(`/roles/${roleId}/candidates`, payload);
    return response.data;
  },

  compareCandidates: async (candidateIdA: string, candidateIdB: string): Promise<ComparisonResult> => {
    const response = await httpService.post<ComparisonResult>('/candidates/compare', {
      candidateIdA,
      candidateIdB,
    });
    return response.data;
  },

  deleteCandidate: async (id: string): Promise<{ message: string }> => {
    const response = await httpService.delete<{ message: string }>(`/candidates/${id}`);
    return response.data;
  },
};
