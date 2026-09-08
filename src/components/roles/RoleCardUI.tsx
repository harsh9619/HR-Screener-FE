import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, AlertTriangle, CheckCircle2, ChevronRight, Trash2 } from 'lucide-react';
import { Role, RoleCardUIProps } from '../../store/roles/types';

export const RoleCardUI: React.FC<RoleCardUIProps> = ({ role, onDelete }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition flex flex-col justify-between shadow-xl">
      <div>
        <div className="flex items-start justify-between">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400 mb-4">
            <Briefcase className="w-6 h-6" />
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(role.id)}
              className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition"
              title="Delete Role"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{role.title}</h3>
        <p className="text-slate-400 text-xs line-clamp-3 mb-6 leading-relaxed">
          {role.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs">
          <div className="font-semibold text-slate-300 flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>{role.candidateCount || 0} candidates</span>
          </div>
          {role.candidateCount && role.candidateCount > 0 && <span>
            {role.reviewCount && role.reviewCount > 0 ? (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium text-[11px] flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>{role.reviewCount} need review</span>
              </span>
            ) : (
              <span className="text-emerald-400 font-medium text-[11px] flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>All clear</span>
              </span>
            )}
          </span>}
        </div>

        <Link
          to={`/roles/${role.id}`}
          className="inline-flex items-center space-x-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition"
        >
          <span>View candidates</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
