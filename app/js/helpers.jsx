import React from 'react';
import { Link, Route } from 'react-router-dom';
import { defaultAlbumPath } from './constants';

const Dropbox = require('dropbox');

// display helpers
export const isSelectedSong = (song1, song2) => (
  song1 === song2 ? ' selected' : ''
);

// Route and template helpers
export function createNavMenu(items) {
  const createLinks = (item, i) => (
    <Link key={i} to={`/${item.replace(' ', '-')}`}>
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

export function formatSong(song, songNumber = 0) {
  const { name, path_lower: path } = song;
  return { name, path, songNumber };
}

// Music player helpers
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

export function formatTime(rawTime) {
  const time = Math.round(rawTime);
  const min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min}:${sec}`;
}

export function handleSkip(cmd, type) {
  let finalType = type;
  if (cmd === 'rewind' && type === 'rewind') finalType = 'back';
  if (cmd === 'forward' && type === 'forward') finalType = 'skip';
  return finalType;
}

export function sortCenter(array, element) {
  const origIndex = array.indexOf(element);
  if (origIndex > -1) {
    const length = array.length;
    const centerIndex = (length % 2 === 0) ? ((length / 2) + 1) : Math.round(length / 2);
    return array.map(function (el, i) {
      if (i === centerIndex - 1) return element;
      if (el === element) return array[centerIndex - 1];
      return el;
    });
  }
  return array;
}
