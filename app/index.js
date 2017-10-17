import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
// import reducer from './reducers';
import albumlibrary from './reducers/albumlibrary';
import root from './root';
import './main.css';

const store = createStore(albumlibrary);

document.body.appendChild(root());

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'),
);
