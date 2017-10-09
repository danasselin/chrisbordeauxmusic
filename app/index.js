import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import root from './root';
import './main.css';

document.body.appendChild(root());

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
