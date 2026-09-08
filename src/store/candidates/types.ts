import { Action } from 'redux';
import {
  FETCH_CANDIDATES_REQUEST,
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATES_FAILURE,
  FETCH_CANDIDATE_BY_ID_REQUEST,
  FETCH_CANDIDATE_BY_ID_SUCCESS,
  FETCH_CANDIDATE_BY_ID_FAILURE,
  CREATE_CANDIDATE_REQUEST,
  CREATE_CANDIDATE_SUCCESS,
  CREATE_CANDIDATE_FAILURE,
  COMPARE_CANDIDATES_REQUEST,
  COMPARE_CANDIDATES_SUCCESS,
  COMPARE_CANDIDATES_FAILURE,
  DELETE_CANDIDATE_REQUEST,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_FAILURE,
} from './actionTypes';
import { CreateCandidatePayload } from '../../services';

export interface CandidateSummary {
  id: string;
  roleId: string;
  name: string;
  email: string;
  integrityStatus: 'clear' | 'review';
  fitScore: number;
  flaggedCount?: number;
  createdAt: string;
}

export interface IntegrityCheck {
  id: string;
  checkType: 'prompt_injection' | 'timeline_inconsistency' | 'templated_inflation';
  flagged: boolean;
  title: string;
  explanation: string;
  evidence: string | null;
  confidence: number;
  createdAt: string;
}

export interface RequirementMatch {
  requirement: string;
  isMustHave: boolean;
  matched: boolean;
  evidence: string | null;
}

export interface CandidateScore {
  overallScore: number;
  summary: string;
  requirements: RequirementMatch[];
}

export interface CandidateDetail {
  id: string;
  roleId: string;
  roleTitle: string;
  name: string;
  email: string;
  resumeText: string;
  integrityStatus: 'clear' | 'review';
  fitScore: number;
  createdAt: string;
  updatedAt: string;
  integrityChecks: IntegrityCheck[];
  candidateScore: CandidateScore | null;
}

export interface ComparisonResult {
  candidateA: {
    id: string;
    name: string;
    fitScore: number;
    integrityStatus: string;
    matchedMustHaves: number;
  };
  candidateB: {
    id: string;
    name: string;
    fitScore: number;
    integrityStatus: string;
    matchedMustHaves: number;
  };
  explanation: string;
}

export interface CandidatesState {
  list: CandidateSummary[];
  selectedCandidate: CandidateDetail | null;
  comparison: ComparisonResult | null;
  loading: boolean;
  creating: boolean;
  comparing: boolean;
  deleting: boolean;
  error: string | null;
}

// Action Payload Types
export interface FetchCandidatesRequestPayload {
  roleId: string;
  params?: { sortBy?: string; order?: string; search?: string };
}

export type FetchCandidatesSuccessPayload = CandidateSummary[];
export type FetchCandidatesFailurePayload = string;

export type FetchCandidateByIdRequestPayload = string;
export type FetchCandidateByIdSuccessPayload = CandidateDetail;
export type FetchCandidateByIdFailurePayload = string;

export interface CreateCandidateRequestPayload {
  roleId: string;
  payload: CreateCandidatePayload;
}

export type CreateCandidateSuccessPayload = string;
export type CreateCandidateFailurePayload = string;

export interface CompareCandidatesRequestPayload {
  candidateIdA: string;
  candidateIdB: string;
}

export type CompareCandidatesSuccessPayload = ComparisonResult;
export type CompareCandidatesFailurePayload = string;

export interface DeleteCandidateRequestPayload {
  id: string;
  roleId?: string;
}

export type DeleteCandidateSuccessPayload = string;
export type DeleteCandidateFailurePayload = string;

// Action Interfaces
import { BaseAction } from '../common';

export interface FetchCandidatesRequestAction extends BaseAction<typeof FETCH_CANDIDATES_REQUEST> {
  type: typeof FETCH_CANDIDATES_REQUEST;
  payload: FetchCandidatesRequestPayload;
}

export interface FetchCandidatesSuccessAction extends BaseAction<typeof FETCH_CANDIDATES_SUCCESS> {
  type: typeof FETCH_CANDIDATES_SUCCESS;
  payload: FetchCandidatesSuccessPayload;
}

export interface FetchCandidatesFailureAction extends BaseAction<typeof FETCH_CANDIDATES_FAILURE> {
  type: typeof FETCH_CANDIDATES_FAILURE;
  payload: FetchCandidatesFailurePayload;
}

export interface FetchCandidateByIdRequestAction extends BaseAction<typeof FETCH_CANDIDATE_BY_ID_REQUEST> {
  type: typeof FETCH_CANDIDATE_BY_ID_REQUEST;
  payload: FetchCandidateByIdRequestPayload;
}

export interface FetchCandidateByIdSuccessAction extends BaseAction<typeof FETCH_CANDIDATE_BY_ID_SUCCESS> {
  type: typeof FETCH_CANDIDATE_BY_ID_SUCCESS;
  payload: FetchCandidateByIdSuccessPayload;
}

export interface FetchCandidateByIdFailureAction extends BaseAction<typeof FETCH_CANDIDATE_BY_ID_FAILURE> {
  type: typeof FETCH_CANDIDATE_BY_ID_FAILURE;
  payload: FetchCandidateByIdFailurePayload;
}

export interface CreateCandidateRequestAction extends BaseAction<typeof CREATE_CANDIDATE_REQUEST> {
  type: typeof CREATE_CANDIDATE_REQUEST;
  payload: CreateCandidateRequestPayload;
  callback?: (candidateId: string) => void;
}

export interface CreateCandidateSuccessAction extends BaseAction<typeof CREATE_CANDIDATE_SUCCESS> {
  type: typeof CREATE_CANDIDATE_SUCCESS;
  payload: CreateCandidateSuccessPayload;
}

export interface CreateCandidateFailureAction extends BaseAction<typeof CREATE_CANDIDATE_FAILURE> {
  type: typeof CREATE_CANDIDATE_FAILURE;
  payload: CreateCandidateFailurePayload;
}

export interface CompareCandidatesRequestAction extends BaseAction<typeof COMPARE_CANDIDATES_REQUEST> {
  type: typeof COMPARE_CANDIDATES_REQUEST;
  payload: CompareCandidatesRequestPayload;
}

export interface CompareCandidatesSuccessAction extends BaseAction<typeof COMPARE_CANDIDATES_SUCCESS> {
  type: typeof COMPARE_CANDIDATES_SUCCESS;
  payload: CompareCandidatesSuccessPayload;
}

export interface CompareCandidatesFailureAction extends BaseAction<typeof COMPARE_CANDIDATES_FAILURE> {
  type: typeof COMPARE_CANDIDATES_FAILURE;
  payload: CompareCandidatesFailurePayload;
}

export interface DeleteCandidateRequestAction extends BaseAction<typeof DELETE_CANDIDATE_REQUEST> {
  type: typeof DELETE_CANDIDATE_REQUEST;
  payload: DeleteCandidateRequestPayload;
  callback?: () => void;
}

export interface DeleteCandidateSuccessAction extends BaseAction<typeof DELETE_CANDIDATE_SUCCESS> {
  type: typeof DELETE_CANDIDATE_SUCCESS;
  payload: DeleteCandidateSuccessPayload;
}

export interface DeleteCandidateFailureAction extends BaseAction<typeof DELETE_CANDIDATE_FAILURE> {
  type: typeof DELETE_CANDIDATE_FAILURE;
  payload: DeleteCandidateFailurePayload;
}

export type CandidatesActionTypes =
  | FetchCandidatesRequestAction
  | FetchCandidatesSuccessAction
  | FetchCandidatesFailureAction
  | FetchCandidateByIdRequestAction
  | FetchCandidateByIdSuccessAction
  | FetchCandidateByIdFailureAction
  | CreateCandidateRequestAction
  | CreateCandidateSuccessAction
  | CreateCandidateFailureAction
  | CompareCandidatesRequestAction
  | CompareCandidatesSuccessAction
  | CompareCandidatesFailureAction
  | DeleteCandidateRequestAction
  | DeleteCandidateSuccessAction
  | DeleteCandidateFailureAction;

