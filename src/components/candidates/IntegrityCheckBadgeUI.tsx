import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface IntegrityCheckBadgeUIProps {
  status: 'clear' | 'review';
  flaggedCount?: number;
}

export const IntegrityCheckBadgeUI: React.FC<IntegrityCheckBadgeUIProps> = ({ status, flaggedCount = 0 }) => {
  if (status === 'review') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>Integrity Review Required ({flaggedCount})</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>Integrity Verified (Clear)</span>
    </span>
  );
};
