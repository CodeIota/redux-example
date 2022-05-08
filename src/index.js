import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import { asyncMiddleware } from './middlewares/async';
import reportWebVitals from './reportWebVitals';
import { reducer } from './features/todos';


const store = createStore(reducer, applyMiddleware(asyncMiddleware))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
