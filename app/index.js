import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { songEnrich, thumbnailEnrich } from './js/helpers.jsx';
import filmScores from './site_data/film_scores.json';
import App from './js/components/App.jsx';
import hcApp from './js/reducers';
import root from './js/root';

import 'font-awesome/css/font-awesome.css'; // eslint-disable-line import/first
import './css/main.css';

const store = createStore(
  hcApp,
  { scores: songEnrich(thumbnailEnrich(filmScores.films)) },
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
