import React from 'react';
import { Link, Route } from 'react-router-dom';

const Dropbox = require('dropbox');

export const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

export function createNavMenu(items) {
  const createLinks = (item, i) => (
    <Link key={i} to={`/${item}`}>
      <li>{item}</li>
    </Link>
  );
  return items.map(createLinks);
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
