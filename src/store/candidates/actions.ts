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
import {
  FetchCandidatesRequestPayload,
  FetchCandidatesSuccessPayload,
  FetchCandidatesFailurePayload,
  FetchCandidateByIdRequestPayload,
  FetchCandidateByIdSuccessPayload,
  FetchCandidateByIdFailurePayload,
  CreateCandidateRequestPayload,
  CreateCandidateSuccessPayload,
  CreateCandidateFailurePayload,
  CompareCandidatesRequestPayload,
  CompareCandidatesSuccessPayload,
  CompareCandidatesFailurePayload,
  DeleteCandidateRequestPayload,
  DeleteCandidateSuccessPayload,
  DeleteCandidateFailurePayload,
  FetchCandidatesRequestAction,
  FetchCandidatesSuccessAction,
  FetchCandidatesFailureAction,
  FetchCandidateByIdRequestAction,
  FetchCandidateByIdSuccessAction,
  FetchCandidateByIdFailureAction,
  CreateCandidateRequestAction,
  CreateCandidateSuccessAction,
  CreateCandidateFailureAction,
  CompareCandidatesRequestAction,
  CompareCandidatesSuccessAction,
  CompareCandidatesFailureAction,
  DeleteCandidateRequestAction,
  DeleteCandidateSuccessAction,
  DeleteCandidateFailureAction,
} from './types';

export const fetchCandidatesRequest = (
  payload: FetchCandidatesRequestPayload
): FetchCandidatesRequestAction => ({
  type: FETCH_CANDIDATES_REQUEST,
  payload,
});

export const fetchCandidatesSuccess = (
  payload: FetchCandidatesSuccessPayload
): FetchCandidatesSuccessAction => ({
  type: FETCH_CANDIDATES_SUCCESS,
  payload,
});

export const fetchCandidatesFailure = (
  payload: FetchCandidatesFailurePayload
): FetchCandidatesFailureAction => ({
  type: FETCH_CANDIDATES_FAILURE,
  payload,
});

export const fetchCandidateByIdRequest = (
  payload: FetchCandidateByIdRequestPayload
): FetchCandidateByIdRequestAction => ({
  type: FETCH_CANDIDATE_BY_ID_REQUEST,
  payload,
});

export const fetchCandidateByIdSuccess = (
  payload: FetchCandidateByIdSuccessPayload
): FetchCandidateByIdSuccessAction => ({
  type: FETCH_CANDIDATE_BY_ID_SUCCESS,
  payload,
});

export const fetchCandidateByIdFailure = (
  payload: FetchCandidateByIdFailurePayload
): FetchCandidateByIdFailureAction => ({
  type: FETCH_CANDIDATE_BY_ID_FAILURE,
  payload,
});

export const createCandidateRequest = (
  payload: CreateCandidateRequestPayload,
  callback?: (candidateId: string) => void
): CreateCandidateRequestAction => ({
  type: CREATE_CANDIDATE_REQUEST,
  payload,
  callback,
});

export const createCandidateSuccess = (
  payload: CreateCandidateSuccessPayload
): CreateCandidateSuccessAction => ({
  type: CREATE_CANDIDATE_SUCCESS,
  payload,
});

export const createCandidateFailure = (
  payload: CreateCandidateFailurePayload
): CreateCandidateFailureAction => ({
  type: CREATE_CANDIDATE_FAILURE,
  payload,
});

export const compareCandidatesRequest = (
  payload: CompareCandidatesRequestPayload
): CompareCandidatesRequestAction => ({
  type: COMPARE_CANDIDATES_REQUEST,
  payload,
});

export const compareCandidatesSuccess = (
  payload: CompareCandidatesSuccessPayload
): CompareCandidatesSuccessAction => ({
  type: COMPARE_CANDIDATES_SUCCESS,
  payload,
});

export const compareCandidatesFailure = (
  payload: CompareCandidatesFailurePayload
): CompareCandidatesFailureAction => ({
  type: COMPARE_CANDIDATES_FAILURE,
  payload,
});

export const deleteCandidateRequest = (
  payload: DeleteCandidateRequestPayload,
  callback?: () => void
): DeleteCandidateRequestAction => ({
  type: DELETE_CANDIDATE_REQUEST,
  payload,
  callback,
});

export const deleteCandidateSuccess = (
  payload: DeleteCandidateSuccessPayload
): DeleteCandidateSuccessAction => ({
  type: DELETE_CANDIDATE_SUCCESS,
  payload,
});

export const deleteCandidateFailure = (
  payload: DeleteCandidateFailurePayload
): DeleteCandidateFailureAction => ({
  type: DELETE_CANDIDATE_FAILURE,
  payload,
});


