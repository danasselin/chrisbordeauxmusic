import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HcSiteRoutes } from '../routes.jsx';
import { createNavMenu, createRoutes } from '../helpers.jsx';
import { navItems } from '../constants';

const App = () => (
  <Router>
    <div className="content">
      <header className="banner">
        <h1>Hayride Casualties</h1>
      </header>
      <nav className="hc-nav">
        <ul>
          { createNavMenu(navItems) }
        </ul>
      </nav>
      <main className="hc-hero"></main>
      { HcSiteRoutes.map(createRoutes) }
    </div>
  </Router>
);


export default App;
