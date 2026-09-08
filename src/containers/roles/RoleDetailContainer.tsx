import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import { AppState } from '../../saga/rootReducer';
import {
  fetchRoleByIdRequest,
  fetchCandidatesRequest,
  deleteCandidateRequest,
} from '../../store';
import { CandidateTableUI } from '../../components/candidates/CandidateTableUI';
import { DeleteConfirmModalUI } from '../../components/common/DeleteConfirmModalUI';
import { AddCandidateModal } from '../../components/roles/AddCandidateModal';

const mapStateToProps = (state: AppState) => ({
  role: state.roles.selectedRole,
  roleLoading: state.roles.loading,
  candidates: state.candidates.list,
  candidatesLoading: state.candidates.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRoleById: (id: string) => dispatch(fetchRoleByIdRequest(id)),
  fetchCandidates: (roleId: string, params: any) => dispatch(fetchCandidatesRequest({ roleId, params })),
  deleteCandidate: (candidateId: string, roleId?: string) =>
    dispatch(deleteCandidateRequest({ id: candidateId, roleId })),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const RoleDetailContainerComponent: React.FC<PropsFromRedux> = (props) => {
  const {
    role,
    roleLoading,
    candidates,
    candidatesLoading,
    fetchRoleById,
    fetchCandidates,
    deleteCandidate,
  } = props;
  const { id: roleId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('fitScore');
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (roleId) {
      fetchRoleById(roleId);
      fetchCandidates(roleId, { sortBy, search });
    }
  }, [roleId, sortBy, search, fetchRoleById, fetchCandidates]);

  const toggleSelectCandidate = (candidateId: string) => {
    if (selectedCandidateIds.includes(candidateId)) {
      setSelectedCandidateIds(selectedCandidateIds.filter((i) => i !== candidateId));
    } else {
      if (selectedCandidateIds.length < 2) {
        setSelectedCandidateIds([...selectedCandidateIds, candidateId]);
      }
    }
  };

  const handleCompare = () => {
    if (selectedCandidateIds.length === 2) {
      navigate(`/compare?a=${selectedCandidateIds[0]}&b=${selectedCandidateIds[1]}`);
    }
  };

  const confirmDeleteCandidate = () => {
    if (candidateToDelete) {
      deleteCandidate(candidateToDelete, roleId);
      setIsDeleteModalOpen(false);
      setCandidateToDelete(null);
    }
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setCandidateToDelete(candidateId);
    setIsDeleteModalOpen(true);
  };

  if (roleLoading && !role) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!role) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-bold text-white mb-2">Role Not Found</h2>
        <Link to="/" className="text-xs text-blue-400 font-bold hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roles</span>
        </Link>

        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">{role.title}</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{role.description}</p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isFormOpen ? 'Close Form' : 'Screen Candidate'}</span>
          </button>
        </div>
      </div>

      <AddCandidateModal
        isOpen={isFormOpen}
        roleId={role.id}
        roleTitle={role.title}
        onClose={() => setIsFormOpen(false)}
        onCandidateAdded={() => fetchCandidates(role.id, { sortBy, search })}
      />

      {candidatesLoading && candidates.length === 0 ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <CandidateTableUI
          candidates={candidates}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedIds={selectedCandidateIds}
          toggleSelectCandidate={toggleSelectCandidate}
          onCompare={handleCompare}
          onDelete={handleDeleteCandidate}
        />
      )}

      <DeleteConfirmModalUI
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteCandidate}
        title="Delete Candidate Record?"
        message="Are you sure you want to delete this candidate evaluation record? All scoring and integrity check results will be permanently removed."
        confirmText="Delete Record"
      />
    </div>
  );
};

export const RoleDetailContainer = connector(RoleDetailContainerComponent);
export default RoleDetailContainer;
