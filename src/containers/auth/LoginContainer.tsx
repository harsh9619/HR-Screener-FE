import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../saga/rootReducer';
import { loginRequest } from '../../store/auth/actions';
import { LoginFormUI } from '../../components/auth/LoginFormUI';
import { FormErrors } from '../../store/auth/types';

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (email: string, pass: string) => dispatch(loginRequest({ email, password: pass }) as any),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginContainerComponent: React.FC<PropsFromRedux> = ({
  isAuthenticated,
  loading,
  error,
  login,
  user,
}) => {
  const [email, setEmail] = useState('recruiter@crystalgroup.com');
  const [password, setPassword] = useState('Password123!');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Login successful! Welcome back ${user?.name || 'Recruiter'}!`);
      navigate('/');
      setIsSubmitting(false);
    }

    if (error) {
      toast.error(error || 'Invalid User ID or password');
      setIsSubmitting(false);
    }
  }, [isAuthenticated, error, user, navigate]);

  const validateField = (field: 'email' | 'password', value: string): string | undefined => {
    if (field === 'email') {
      if (!value.trim()) {
        return 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Invalid email address';
      }
    }
    if (field === 'password') {
      if (!value) {
        return 'Password is required';
      } else if (value.length < 8) {
        return 'Password must be at least 8 characters';
      }
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);
    const newErrors: FormErrors = {};
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: 'email' | 'password') => {
    const value = field === 'email' ? email : password;
    const fieldError = validateField(field, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (fieldError) {
        newErrors[field] = fieldError;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    login(email, password);
  };

  return (
    <LoginFormUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      onBlurField={handleBlur}
      loading={loading || isSubmitting}
      authError={error}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
};

export const LoginContainer = connector(LoginContainerComponent);
export default LoginContainer;
