import React from 'react';
import { LoginFormUIProps } from '../../store/auth/types';
import { ShieldCheck, Mail, Lock, Loader2, UserPlus } from 'lucide-react';

export const LoginFormUI: React.FC<LoginFormUIProps> = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    onSubmit,
    onBlurField,
    loading,
    authError,
    errors = {},
    isSubmitting,
    onOpenRegisterModal,
  } = props;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10">
            <ShieldCheck className="w-10 h-10 text-blue-400" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
          Candidate Screening
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          AI Candidate Integrity & Fit Scoring Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-md py-8 px-4 shadow-2xl border border-slate-800 sm:rounded-2xl sm:px-10 space-y-6">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Work Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => onBlurField('email')}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                  placeholder="recruiter@crystalgroup.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-400 font-medium">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  disabled={isSubmitting}
                  onBlur={() => onBlurField('password')}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400 font-medium">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting || Object.keys(errors).length > 0}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Registration Modal Trigger Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenRegisterModal}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/60 transition"
            >
              <UserPlus className="w-4 h-4 text-blue-400" />
              <span>Don't have an account? Register Here</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              Demo Login: <span className="text-slate-300 font-mono">recruiter@crystalgroup.com</span> / <span className="text-slate-300 font-mono">Password123!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
