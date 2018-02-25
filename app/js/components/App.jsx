import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AlbumLibrary from '~/app/js/containers/AlbumLibrary.jsx';
import {
  createNavMenu,
  createRoutes,
} from '~/app/js/helpers.jsx';
import { HcSiteRoutes } from '~/app/js/routes.jsx';
import { navItems } from '~/app/js/constants';

const App = () => (
  <Router>
    <div className="content">
      <div className="site-container">
        <AlbumLibrary />
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
