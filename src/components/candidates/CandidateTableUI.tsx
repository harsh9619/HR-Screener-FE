import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, User, Trash2, Eye } from 'lucide-react';
import { CandidateSummary } from '../../store/candidates/types';
import { IntegrityCheckBadgeUI } from './IntegrityCheckBadgeUI';

interface CandidateTableUIProps {
  candidates: CandidateSummary[];
  search: string;
  setSearch: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedIds: string[];
  toggleSelectCandidate: (id: string) => void;
  onCompare: () => void;
  onDelete?: (id: string) => void;
}

export const CandidateTableUI: React.FC<CandidateTableUIProps> = ({
  candidates,
  search,
  setSearch,
  sortBy,
  setSortBy,
  selectedIds,
  toggleSelectCandidate,
  onCompare,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fitScore">Fit Score (High to Low)</option>
              <option value="name">Candidate Name (A-Z)</option>
              <option value="integrityStatus">Integrity Review Status</option>
            </select>
          </div>

          <button
            onClick={onCompare}
            disabled={selectedIds.length !== 2}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition shadow-lg shadow-blue-600/25"
          >
            Compare (Selected {selectedIds.length}/2)
          </button>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-4 px-4 w-10 text-center">Select</th>
              <th className="py-4 px-4">Candidate</th>
              <th className="py-4 px-4">Integrity Status</th>
              <th className="py-4 px-4">Fit Score</th>
              <th className="py-4 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs">
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  No candidates found for this position.
                </td>
              </tr>
            ) : (
              candidates.map((c) => {
                const isSelected = selectedIds.includes(c.id);
                return (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectCandidate(c.id)}
                        className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{c.name}</div>
                          <div className="text-slate-500 text-xs">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <IntegrityCheckBadgeUI status={c.integrityStatus} flaggedCount={c.flaggedCount} />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-white">{c.fitScore}%</span>
                        <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${c.fitScore >= 85
                              ? 'bg-emerald-500'
                              : c.fitScore >= 70
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                              }`}
                            style={{ width: `${c.fitScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center space-x-2">
                      <Link
                        to={`/candidates/${c.id}`}
                        className="inline-flex items-center p-2 space-x-1 font-bold rounded-lg text-blue-400 hover:text-blue-400 hover:bg-blue-500/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(c.id)}
                          className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 hover:text-blue-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
