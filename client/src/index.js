import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import './styles/index.css';


ReactDOM.render(
  <ModalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ModalProvider>,
  document.getElementById('root')
);
