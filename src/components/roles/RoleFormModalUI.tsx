import React from 'react';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import { RoleFormModalUIProps } from '../../store/roles/types';

export const RoleFormModalUI: React.FC<RoleFormModalUIProps> = ({
  isOpen,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  requirements,
  setRequirements,
  onSubmit,
  loading,
}) => {
  if (!isOpen) return null;

  const handleAddRequirement = () => {
    setRequirements([...requirements, { requirement: '', isMustHave: true }]);
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleRequirementChange = (index: number, field: 'requirement' | 'isMustHave', value: any) => {
    const updated = [...requirements];
    updated[index] = { ...updated[index], [field]: value };
    setRequirements(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Create New Open Role</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Job Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Role Description
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Overview of duties, responsibilities, and team scope..."
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Evaluation Requirements
              </label>
              <button
                type="button"
                onClick={handleAddRequirement}
                className="inline-flex items-center space-x-1 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                <Plus className="w-4 h-4" />
                <span>Add Criterion</span>
              </button>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                  <input
                    type="text"
                    required
                    value={req.requirement}
                    onChange={(e) => handleRequirementChange(idx, 'requirement', e.target.value)}
                    placeholder="e.g. 5+ years TypeScript & React"
                    className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-600"
                  />
                  <label className="flex items-center space-x-1 text-xs text-slate-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={req.isMustHave}
                      onChange={(e) => handleRequirementChange(idx, 'isMustHave', e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Must-Have</span>
                  </label>
                  {requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(idx)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/25 flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Role...</span>
                </>
              ) : (
                <span>Publish Role</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
