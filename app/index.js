import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import App from './components/App.jsx'; // eslint-disable-line no-unused-vars
import root from './root';
import './main.css';

document.body.appendChild(root());

ReactDOM.render(<App />, document.getElementById('root'));
