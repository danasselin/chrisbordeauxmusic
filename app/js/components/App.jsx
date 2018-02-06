import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AlbumLibrary from '~/app/js/containers/AlbumLibrary.jsx';
import { enrichedScores } from '~/app/site_data/addThumbnails';
import { HcSiteRoutes } from '../routes.jsx';
import { createNavMenu, createRoutes, fetchAlbum } from '../helpers.jsx';
import { navItems } from '../constants';

const App = () => (
  <Router>
    <div className="content">
      <div className="site-container">
        <AlbumLibrary
          fetchAlbum={ fetchAlbum }
          previews={ enrichedScores }
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
