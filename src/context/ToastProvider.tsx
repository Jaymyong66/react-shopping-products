import React, { createContext, useState, useCallback, ReactNode } from 'react';
import ErrorToast from '../components/ErrorToast/ErrorToast';

export interface ToastContextType {
  showToast: ({ message, duration }: ToastParameters) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastParameters {
  message: string;
  duration: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = useCallback(({ message, duration }: ToastParameters) => {
    setMessage(message);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isOpen && <ErrorToast message={message} />}
    </ToastContext.Provider>
  );
};
