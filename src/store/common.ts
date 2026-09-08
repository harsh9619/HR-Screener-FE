import { Action } from 'redux';

export interface BaseAction<T extends string = string> extends Action<T> {
  type: T;
  [key: string]: any;
}

export interface DeleteConfirmModalUIProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
