import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import reducer from './reducers/allReducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducer);

store.subscribe(() => {
  const myReducers = store.getState();
  sessionStorage.setItem('basket', JSON.stringify(myReducers.reducerPanier));
  sessionStorage.setItem('isLogged', JSON.stringify(myReducers.reducerSession.isLogged));
  sessionStorage.setItem('user', JSON.stringify(myReducers.reducerSession.user));
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
