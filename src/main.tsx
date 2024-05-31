import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './styles/reset.css';
import './styles/index.css';
import { ToastProvider } from './context/ToastProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
);
