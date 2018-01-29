import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AlbumLibrary from '~/app/js/containers/AlbumLibrary.jsx';
import landline from '~/app/images/Landline-movie-poster.jpg';
import obviousChild from '~/app/images/Obvious-child-movie-poster.jpg';
import lastTemptation from '~/app/images/last-temptation-of-christ-movie-poster.jpg';
import { HcSiteRoutes } from '../routes.jsx';
import { createNavMenu, createRoutes, fetchAlbum } from '../helpers.jsx';
import { navItems } from '../constants';

const App = () => (
  <Router>
    <div className="content">
      <div className="site-container">
        <AlbumLibrary
          fetchAlbum={ fetchAlbum }
          previews={ [landline, obviousChild, lastTemptation] }
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
