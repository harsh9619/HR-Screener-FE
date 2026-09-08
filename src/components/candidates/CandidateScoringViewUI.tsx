import React from 'react';
import { CandidateDetail } from '../../store/candidates/types';
import { IntegrityCheckBadgeUI } from './IntegrityCheckBadgeUI';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface CandidateScoringViewUIProps {
  candidate: CandidateDetail;
}

export const CandidateScoringViewUI: React.FC<CandidateScoringViewUIProps> = ({ candidate }) => {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            {candidate.roleTitle}
          </div>
          <h1 className="text-2xl font-extrabold text-white">{candidate.name}</h1>
          <p className="text-xs text-slate-400 mt-1">{candidate.email}</p>
        </div>

        <div className="flex items-center space-x-6">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Integrity Check</div>
            <IntegrityCheckBadgeUI status={candidate.integrityStatus} />
          </div>

          <div className="pl-6 border-l border-slate-800 text-right">
            <div className="text-[11px] font-semibold text-slate-400 uppercase mb-1">Fit Score</div>
            <div className="text-3xl font-extrabold text-white">{candidate.fitScore}%</div>
          </div>
        </div>
      </div>

      {/* Integrity Checks Breakdown */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <span>AI Integrity Pipeline Verification</span>
        </h3>
        <div className="space-y-3">
          {candidate.integrityChecks.map((check) => (
            <div
              key={check.id}
              className={`p-4 rounded-xl border ${check.flagged
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {check.flagged ? (
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm text-white">{check.title}</h4>
                    <p className="text-xs text-slate-300 mt-1">{check.explanation}</p>
                    {check.evidence && (
                      <div className="mt-2 text-xs font-mono bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-amber-200">
                        Evidence: "{check.evidence}"
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Confidence: {Math.round(check.confidence * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirement Matching Breakdown */}
      {candidate.candidateScore && (
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-2">Requirement Fit Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">{candidate.candidateScore.summary}</p>

          <div className="space-y-2">
            {candidate.candidateScore.requirements.map((req, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
                <div className="flex items-center space-x-3">
                  {req.matched ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-xs font-semibold text-white">{req.requirement}</span>
                    {req.isMustHave && (
                      <span className="ml-2 text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        Must Have
                      </span>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-bold ${req.matched ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {req.matched ? 'Satisfied' : 'Not Found'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
