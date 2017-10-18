import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
// import reducer from './reducers';
import hcApp from './reducers';
import root from './root';
import './main.css';

const store = createStore(
  hcApp,
  /* preloadedState, */

  window // eslint-disable-line no-underscore-dangle
    .__REDUX_DEVTOOLS_EXTENSION__ && // eslint-disable-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle
);

document.body.appendChild(root());

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'),
);
