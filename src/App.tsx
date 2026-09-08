import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppState } from './saga/rootReducer';
import { LoginContainer } from './containers/auth/LoginContainer';
import { RolesDashboardContainer } from './containers/roles/RolesDashboardContainer';
import { RoleDetailContainer } from './containers/roles/RoleDetailContainer';
import { CandidateDetailContainer } from './containers/candidates/CandidateDetailContainer';
import { CompareCandidatesContainer } from './containers/candidates/CompareCandidatesContainer';
import { LayoutContainer } from './containers/LayoutContainer';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading: isLoading } = useSelector((state: AppState) => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-mono text-xs">
        Loading HR Candidate Screener...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <LayoutContainer>{children}</LayoutContainer>;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RolesDashboardContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles/:id"
          element={
            <ProtectedRoute>
              <RoleDetailContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidates/:id"
          element={
            <ProtectedRoute>
              <CandidateDetailContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compare"
          element={
            <ProtectedRoute>
              <CompareCandidatesContainer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
