import { takeLatest, call, put, StrictEffect } from 'redux-saga/effects';
import {
  FETCH_CANDIDATES_REQUEST,
  FETCH_CANDIDATE_BY_ID_REQUEST,
  CREATE_CANDIDATE_REQUEST,
  COMPARE_CANDIDATES_REQUEST,
  DELETE_CANDIDATE_REQUEST,
} from './actionTypes';
import {
  fetchCandidatesSuccess,
  fetchCandidatesFailure,
  fetchCandidateByIdSuccess,
  fetchCandidateByIdFailure,
  createCandidateSuccess,
  createCandidateFailure,
  compareCandidatesSuccess,
  compareCandidatesFailure,
  deleteCandidateSuccess,
  deleteCandidateFailure,
  fetchCandidatesRequest,
} from './actions';
import {
  candidatesService,
  CandidatesListResponse,
  CandidateDetailResponse,
  CreateCandidateResponse,
} from '../../services';
import {
  ComparisonResult,
  FetchCandidatesRequestAction,
  FetchCandidateByIdRequestAction,
  CreateCandidateRequestAction,
  CompareCandidatesRequestAction,
  DeleteCandidateRequestAction,
} from './types';

function* handleFetchCandidates(
  action: FetchCandidatesRequestAction): Generator<StrictEffect> {
  try {
    const { roleId, params } = action.payload;
    const response: CandidatesListResponse = yield call(candidatesService.getCandidatesByRole, roleId, params);
    yield put(fetchCandidatesSuccess(response.candidates));
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to fetch candidates.';
    yield put(fetchCandidatesFailure(message));
  }
}

function* handleFetchCandidateById(
  action: FetchCandidateByIdRequestAction
): Generator<StrictEffect> {
  try {
    const response: CandidateDetailResponse = yield call(candidatesService.getCandidateById, action.payload);
    yield put(fetchCandidateByIdSuccess(response.candidate));
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to fetch candidate details.';
    yield put(fetchCandidateByIdFailure(message));
  }
}

function* handleCreateCandidate(
  action: CreateCandidateRequestAction
): Generator<StrictEffect> {
  try {
    const { roleId, payload } = action.payload;
    const response: CreateCandidateResponse = yield call(candidatesService.createCandidate, roleId, payload);
    yield put(createCandidateSuccess(response.candidateId));
    yield put(fetchCandidatesRequest({ roleId }));
    if (action.callback) {
      action.callback(response.candidateId);
    }
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to create candidate.';
    yield put(createCandidateFailure(message));
  }
}

function* handleCompareCandidates(
  action: CompareCandidatesRequestAction
): Generator<StrictEffect> {
  try {
    const { candidateIdA, candidateIdB } = action.payload;
    const response: ComparisonResult = yield call(candidatesService.compareCandidates, candidateIdA, candidateIdB);
    yield put(compareCandidatesSuccess(response));
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to compare candidates.';
    yield put(compareCandidatesFailure(message));
  }
}

function* handleDeleteCandidate(
  action: DeleteCandidateRequestAction
): Generator<StrictEffect> {
  try {
    const { id, roleId } = action.payload;
    yield call(candidatesService.deleteCandidate, id);
    yield put(deleteCandidateSuccess(id));
    if (roleId) {
      yield put(fetchCandidatesRequest({ roleId }));
    }
    if (action.callback) {
      action.callback();
    }
  } catch (error: any) {
    const message = error.response?.data?.error || 'Failed to delete candidate.';
    yield put(deleteCandidateFailure(message));
  }
}

export function* candidatesSaga() {
  yield takeLatest(FETCH_CANDIDATES_REQUEST, handleFetchCandidates);
  yield takeLatest(FETCH_CANDIDATE_BY_ID_REQUEST, handleFetchCandidateById);
  yield takeLatest(CREATE_CANDIDATE_REQUEST, handleCreateCandidate);
  yield takeLatest(COMPARE_CANDIDATES_REQUEST, handleCompareCandidates);
  yield takeLatest(DELETE_CANDIDATE_REQUEST, handleDeleteCandidate);
}
