import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Plus, Briefcase, Loader2 } from 'lucide-react';
import { AppState } from '../../saga/rootReducer';
import { fetchRolesRequest, createRoleRequest, deleteRoleRequest } from '../../store';
import { RoleCardUI } from '../../components/roles/RoleCardUI';
import { RoleFormModalUI } from '../../components/roles/RoleFormModalUI';
import { DeleteConfirmModalUI } from '../../components/common/DeleteConfirmModalUI';

const mapStateToProps = (state: AppState) => ({
  roles: state.roles.list,
  loading: state.roles.loading,
  creating: state.roles.creating,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRoles: () => dispatch(fetchRolesRequest()),
  createRole: (payload: any, callback: () => void) => dispatch(createRoleRequest(payload, callback)),
  deleteRole: (id: string) => dispatch(deleteRoleRequest(id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const RolesDashboardContainerComponent: React.FC<PropsFromRedux> = (props) => {
  const {
    roles,
    loading,
    creating,
    fetchRoles,
    createRole,
    deleteRole,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState([
    { requirement: 'React & TypeScript', isMustHave: true },
    { requirement: 'Node.js & Express', isMustHave: true },
    { requirement: 'PostgreSQL Database', isMustHave: true },
  ]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleCreateRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    createRole(
      { title, description, requirements },
      () => {
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
      }
    );
  };

  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  const confirmDeleteRole = () => {
    if (roleToDelete) {
      deleteRole(roleToDelete);
      setRoleToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteRole = (id: string) => {
    setRoleToDelete(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-3">
            <Briefcase className="w-7 h-7 text-blue-400" />
            <span>Open Requisitions Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated AI Candidate Integrity Verification & Fit Scoring
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/25"
        >
          <Plus className="w-4 h-4" />
          <span>New Open Role</span>
        </button>
      </div>

      {loading && roles.length === 0 ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <RoleCardUI key={role.id} role={role} onDelete={handleDeleteRole} />
          ))}
        </div>
      )}

      <RoleFormModalUI
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        requirements={requirements}
        setRequirements={setRequirements}
        onSubmit={handleCreateRoleSubmit}
        loading={creating}
      />

      <DeleteConfirmModalUI
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteRole}
        title=""
        message="Are you sure you want to delete this open role? All associated candidate evaluations and scoring records will be removed."
        confirmText="Delete Role"
      />
    </div>
  );
};

export const RolesDashboardContainer = connector(RolesDashboardContainerComponent);
export default RolesDashboardContainer;
