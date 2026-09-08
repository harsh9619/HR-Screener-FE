import * as types from './actionTypes';
import { CandidatesState, CandidatesActionTypes } from './types';

const initialState: CandidatesState = {
  list: [],
  selectedCandidate: null,
  comparison: null,
  loading: false,
  creating: false,
  comparing: false,
  deleting: false,
  error: null,
};

export const candidatesReducer = (
  state = initialState,
  action: CandidatesActionTypes
): CandidatesState => {
  switch (action.type) {
    case types.FETCH_CANDIDATES_REQUEST:
    case types.FETCH_CANDIDATE_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_CANDIDATES_SUCCESS:
      return { ...state, loading: false, list: action.payload, error: null };

    case types.FETCH_CANDIDATE_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedCandidate: action.payload, error: null };

    case types.FETCH_CANDIDATES_FAILURE:
    case types.FETCH_CANDIDATE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.CREATE_CANDIDATE_REQUEST:
      return { ...state, creating: true, error: null };
    case types.CREATE_CANDIDATE_SUCCESS:
      return { ...state, creating: false, error: null };
    case types.CREATE_CANDIDATE_FAILURE:
      return { ...state, creating: false, error: action.payload };

    case types.COMPARE_CANDIDATES_REQUEST:
      return { ...state, comparing: true, error: null };
    case types.COMPARE_CANDIDATES_SUCCESS:
      return { ...state, comparing: false, comparison: action.payload, error: null };
    case types.COMPARE_CANDIDATES_FAILURE:
      return { ...state, comparing: false, error: action.payload };

    case types.DELETE_CANDIDATE_REQUEST:
      return { ...state, deleting: true, error: null };
    case types.DELETE_CANDIDATE_SUCCESS:
      return {
        ...state,
        deleting: false,
        list: state.list.filter((c) => c.id !== action.payload),
        selectedCandidate: state.selectedCandidate?.id === action.payload ? null : state.selectedCandidate,
        error: null,
      };
    case types.DELETE_CANDIDATE_FAILURE:
      return { ...state, deleting: false, error: action.payload };

    default:
      return state;
  }
};

