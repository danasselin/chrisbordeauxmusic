import React from 'react';
import { Link, Route } from 'react-router-dom';
import { navItems } from './constants';

const Dropbox = require('dropbox');

export const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

export function createNavMenu() {
  const createLinks = (item, i) => (
    <Link key={i} to={`/${item}`}>
      <li>{item}</li>
    </Link>
  );
  return navItems.map(createLinks);
}

export const createRoutes = (route, i) => (
  <Route
    key={ i }
    path={ route.path }
    render={ (props) => {
      let updatedProps;
      if (route.propsData) {
        updatedProps = Object.assign({}, props, route.propsData);
        return <route.component {...updatedProps} />;
      }
      return <route.component {...props} />;
    }}
  />
);
