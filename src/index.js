import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CombinedContextProvider from './context/CombinedContextProvider';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CombinedContextProvider>
      <ToastContainer />
    <App />
  </CombinedContextProvider>
);

reportWebVitals();
