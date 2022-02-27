import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import store from "./store/index"
window.store = store;
ReactDOM.render(

  <BrowserRouter>
  <Provider store={store}>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </Provider>
</BrowserRouter>
  ,
  document.getElementById('root')
);


reportWebVitals();
