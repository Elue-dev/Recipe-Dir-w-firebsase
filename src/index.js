import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { transitions, positions, Provider as AlertProvider, types } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: '10px',
  transition: transitions.SCALE,
  type: types.INFO
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
