
import React from 'react';
import ReactDOM from 'react-dom';
// ray test touch <
import { BrowserRouter } from '@components/Router';
// ray test touch >

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ray test touch <
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // <App />,
  document.getElementById('root')
);
// ray test touch >

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
