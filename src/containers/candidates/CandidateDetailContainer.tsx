import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { AppState } from '../../saga/rootReducer';
import { fetchCandidateByIdRequest } from '../../store/candidates/actions';
import { CandidateScoringViewUI } from '../../components/candidates/CandidateScoringViewUI';

const mapStateToProps = (state: AppState) => ({
  candidate: state.candidates.selectedCandidate,
  loading: state.candidates.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCandidateById: (id: string) => dispatch(fetchCandidateByIdRequest(id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const CandidateDetailContainerComponent: React.FC<PropsFromRedux> = ({
  candidate,
  loading,
  fetchCandidateById,
}) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchCandidateById(id);
    }
  }, [id, fetchCandidateById]);

  if (loading && !candidate) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-bold text-white mb-2">Candidate Not Found</h2>
        <Link to="/" className="text-xs text-blue-400 font-bold hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to={`/roles/${candidate.roleId}`} className="inline-flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Role Candidates</span>
      </Link>

      <CandidateScoringViewUI candidate={candidate} />
    </div>
  );
};

export const CandidateDetailContainer = connector(CandidateDetailContainerComponent);
export default CandidateDetailContainer;
