import React from 'react';
import styles from './ErrorToast.module.css';

interface ErrorToastProps {
  message: string;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message }) => {
  return <div className={styles.toast}>{message}</div>;
};

export default ErrorToast;
