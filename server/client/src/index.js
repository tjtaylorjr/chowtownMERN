import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store'
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import './styles/index.css';

const store = configureStore();

ReactDOM.render(
  <ModalProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ModalProvider>,
  document.getElementById('root')
);
