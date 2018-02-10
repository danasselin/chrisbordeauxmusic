import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AlbumLibrary from '~/app/js/containers/AlbumLibrary.jsx';
import filmScores from '~/app/site_data/film_scores.json';
import {
  createNavMenu,
  createRoutes,
  fetchAlbum,
  enrichScores,
} from '~/app/js/helpers.jsx';
import { HcSiteRoutes } from '../routes.jsx';
import { navItems } from '../constants';

const App = () => (
  <Router>
    <div className="content">
      <div className="site-container">
        <AlbumLibrary
          fetchAlbum={ fetchAlbum }
          previews={ enrichScores(filmScores.films) }
        />
        <div className="page-container">
          <nav className="hc-nav">
            <ul>
              { createNavMenu(navItems) }
            </ul>
          </nav>
          { HcSiteRoutes.map(createRoutes) }
        </div>
      </div>
    </div>
  </Router>
);


export default App;
