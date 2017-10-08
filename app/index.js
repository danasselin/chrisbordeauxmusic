import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import App from './App.jsx';
import component from './component';
import './main.css';

document.body.appendChild(component());

ReactDOM.render(App, document.getElementById('root'));
