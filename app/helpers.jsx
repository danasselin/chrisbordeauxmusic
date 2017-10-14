import React from 'react';
import { Link, Route } from 'react-router-dom';

const Dropbox = require('dropbox');
const equal = require('deep-equal');

// Route and template helpers
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

// Music API helpers
export const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });
export function fetchSongNames(albumPath) {
  // 'this' is a SongPlayer instance
  dbx.filesListFolder({ path: albumPath })
    .then(({ entries: album }) => {
      // poor man's caching
      window.currentAlbum = { album };
      if (!equal(window.currentAlbum, this.state)) this.setState({ album });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function fetchSongPlayData(albumPath) {
  dbx.filesGetTemporaryLink({ path: `${albumPath}` })
    .then((response) => {
      // 'this' is a Song instance
      this.setState({ link: response.link });
    })
    .catch((error) => {
      console.log(error);
    });
}
