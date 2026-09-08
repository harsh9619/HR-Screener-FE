import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { X, UserPlus, Loader2 } from 'lucide-react';
import { AppState } from '../../saga/rootReducer';
import { createCandidateRequest } from '../../store';

const mapStateToProps = (state: AppState) => ({
  creatingCandidate: state.candidates.creating,
  createCandidateError: state.candidates.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createCandidate: (roleId: string, payload: any, callback: () => void) =>
    dispatch(createCandidateRequest({ roleId, payload }, callback)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface AddCandidateModalOwnProps {
  isOpen: boolean;
  roleId: string;
  roleTitle: string;
  onClose: () => void;
  onCandidateAdded: () => void;
}

type AddCandidateModalProps = AddCandidateModalOwnProps & PropsFromRedux;



const AddCandidateModalComponent: React.FC<AddCandidateModalProps> = ({
  isOpen,
  roleId,
  roleTitle,
  onClose,
  onCandidateAdded,
  createCandidate,
  creatingCandidate,
  createCandidateError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [localError, setLocalError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !resumeText.trim()) {
      setLocalError('Candidate name, email, and resume text are required.');
      return;
    }

    setLocalError('');

    createCandidate(
      roleId,
      {
        name: name.trim(),
        email: email.trim(),
        resumeText: resumeText.trim(),
      },
      () => {
        onCandidateAdded();
        onClose();
        setName('');
        setEmail('');
        setResumeText('');
      }
    );
  };

  const displayError = localError || createCandidateError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Add Candidate to {roleTitle}</h2>
              <p className="text-xs text-slate-400">
                Paste raw plain-text resume.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {displayError && (
          <div className="p-3 text-xs rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium">
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Candidate Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="candidate@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Resume Plain Text *
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {resumeText.length} characters
              </span>
            </div>
            <textarea
              placeholder="Paste raw resume plain text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={8}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
              required
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400" />

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingCandidate}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-500/25 disabled:opacity-50 flex items-center space-x-2"
              >
                {creatingCandidate ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <span>Add Candidate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddCandidateModal = connector(AddCandidateModalComponent);
export default AddCandidateModal;
