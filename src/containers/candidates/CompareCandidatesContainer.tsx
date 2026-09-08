import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { ArrowLeft, Loader2, Scale, Sparkles } from 'lucide-react';
import { AppState } from '../../saga/rootReducer';
import { compareCandidatesRequest } from '../../store/candidates/actions';
import { IntegrityCheckBadgeUI } from '../../components/candidates/IntegrityCheckBadgeUI';

const mapStateToProps = (state: AppState) => ({
  comparison: state.candidates.comparison,
  loading: state.candidates.comparing,
  error: state.candidates.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  compareCandidates: (idA: string, idB: string) =>
    dispatch(compareCandidatesRequest({ candidateIdA: idA, candidateIdB: idB })),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const CompareCandidatesContainerComponent: React.FC<PropsFromRedux> = ({
  comparison,
  loading,
  error,
  compareCandidates,
}) => {
  const [searchParams] = useSearchParams();
  const candidateIdA = searchParams.get('a');
  const candidateIdB = searchParams.get('b');

  useEffect(() => {
    if (candidateIdA && candidateIdB) {
      compareCandidates(candidateIdA, candidateIdB);
    }
  }, [candidateIdA, candidateIdB, compareCandidates]);

  if (loading && !comparison) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error || !comparison) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-bold text-white mb-2">Unable to Load Comparison</h2>
        <p className="text-xs text-slate-400 mb-4">{error || 'Invalid candidate parameters.'}</p>
        <Link to="/" className="text-xs text-blue-400 font-bold hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const { candidateA, candidateB, explanation } = comparison;

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>

      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <Scale className="w-7 h-7 text-blue-400" />
            <span>Side-by-Side Candidate Evaluation</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comparative analysis based on fit scoring and integrity check evidence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidate A Card */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xl font-bold text-white">{candidateA.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Integrity Status</span>
            <IntegrityCheckBadgeUI status={candidateA.integrityStatus as any} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Fit Score</span>
            <span className="text-2xl font-extrabold text-white">{candidateA.fitScore}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Matched Must-Haves</span>
            <span className="text-sm font-bold text-emerald-400">{candidateA.matchedMustHaves} criteria</span>
          </div>
        </div>

        {/* Candidate B Card */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xl font-bold text-white">{candidateB.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Integrity Status</span>
            <IntegrityCheckBadgeUI status={candidateB.integrityStatus as any} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Fit Score</span>
            <span className="text-2xl font-extrabold text-white">{candidateB.fitScore}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Matched Must-Haves</span>
            <span className="text-sm font-bold text-emerald-400">{candidateB.matchedMustHaves} criteria</span>
          </div>
        </div>
      </div>

      {/* AI Comparison Synthesis */}
      <div className="bg-blue-950/30 border border-blue-500/20 p-6 rounded-2xl space-y-2">
        <h4 className="text-sm font-bold text-blue-400 flex items-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span>AI Comparative Analysis Summary</span>
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">{explanation}</p>
      </div>
    </div>
  );
};

export const CompareCandidatesContainer = connector(CompareCandidatesContainerComponent);
export default CompareCandidatesContainer;
