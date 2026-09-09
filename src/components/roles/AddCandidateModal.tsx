import React, { useState, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { X, UserPlus, Loader2, Upload, FileText, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';
import { AppState } from '../../saga/rootReducer';
import { createCandidateRequest } from '../../store';
import { extractTextFromFile } from '../../utils/fileExtractor';

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
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedFileName, setExtractedFileName] = useState('');
  const [fileExtractSuccess, setFileExtractSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsExtracting(true);
    setLocalError('');
    setFileExtractSuccess(false);

    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
      setExtractedFileName(file.name);
      setFileExtractSuccess(true);

      // Auto-fill candidate name if empty from filename (e.g. John_Doe_Resume.pdf -> John Doe)
      if (!name.trim()) {
        const rawName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b(resume|cv|profile|doc|pdf)\b/gi, '')
          .trim();
        if (rawName) {
          setName(rawName.charAt(0).toUpperCase() + rawName.slice(1));
        }
      }
    } catch (err: any) {
      console.error('Failed to extract file text:', err);
      setLocalError(err.message || 'Failed to extract text from file.');
      setFileExtractSuccess(false);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

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
        setExtractedFileName('');
        setFileExtractSuccess(false);
      }
    );
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setResumeText('');
    setExtractedFileName('');
    setFileExtractSuccess(false);
    onClose();
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
                Upload a PDF / DOC / DOCX file or paste raw plain-text resume.
              </p>
            </div>
          </div>
          <button onClick={() => handleCancel()} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {displayError && (
          <div className="p-3 text-xs rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{displayError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Zone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Upload Resume File (.pdf, .docx, .doc, .txt)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${isExtracting
                ? 'border-blue-500/50 bg-blue-500/5'
                : fileExtractSuccess
                  ? 'border-emerald-500/50 bg-emerald-500/5'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-950'
                }`}
            >
              {isExtracting ? (
                <div className="flex items-center justify-center space-x-2 text-xs font-medium text-blue-400 py-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Extracting plain text from document...</span>
                </div>
              ) : fileExtractSuccess ? (
                <div className="flex items-center justify-between text-xs font-medium text-emerald-400 px-2">
                  <div className="flex items-center space-x-2">
                    <FileCheck className="w-5 h-5 text-emerald-400" />
                    <span>
                      Extracted text from <strong className="text-emerald-300">{extractedFileName}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="text-[11px] underline hover:text-emerald-200"
                  >
                    Change file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-1.5 py-1 text-slate-400">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-blue-400 hover:underline">Click to upload</span> or drag & drop PDF, DOC, DOCX, or TXT
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Text will be automatically extracted into the field below
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* File Upload Zone end */}

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
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Resume Plain Text *</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {resumeText.length.toLocaleString()} characters
              </span>
            </div>
            <textarea
              placeholder="Extracted plain text or paste raw resume plain text here..."
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
                onClick={() => handleCancel()}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingCandidate || isExtracting}
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

