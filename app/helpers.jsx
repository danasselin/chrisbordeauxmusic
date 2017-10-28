import React from 'react';
import { Link, Route } from 'react-router-dom';
import { defaultAlbumPath } from './constants';

const Dropbox = require('dropbox');

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

export function fetchAlbum(albumPath = defaultAlbumPath) {
  return dbx.filesListFolder({ path: albumPath });
}

export function fetchSongPlayData(albumPath) {
  return dbx.filesGetTemporaryLink({ path: `${albumPath}` });
}

export function getStartTime(time) {
  const milliseconds = time * 1000;
  return (time === 0 ? performance.now() : performance.now() - milliseconds);
}

export function animate({ // eslint-ignore-line
  duration,
  draw,
  timing,
  player,
  startTime,
}) {
  const start = startTime();
  return function callback(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    const progress = timing(timeFraction);
    draw(progress);
    if (timeFraction < 1 && player.cmd === 'play') {
      requestAnimationFrame(callback);
    }
  };
}
