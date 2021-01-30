import React from 'react';
import ReactDOM from 'react-dom';
import './scss/styles.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./reducers";
import { Provider } from 'react-redux';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import {exportSelector} from "./selectors";
import {importProjectAndSetupIdGenerators} from "./import";
import exampleProject from "./exampleProject";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

const savedState = localStorage.getItem('state');
if (savedState) {
    importProjectAndSetupIdGenerators(store.dispatch, JSON.parse(savedState as any));
} else {
    importProjectAndSetupIdGenerators(store.dispatch, JSON.parse(exampleProject));
}

window.onbeforeunload = () => {
    const data = JSON.stringify(exportSelector(store.getState()));
    localStorage.setItem('state', data);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
