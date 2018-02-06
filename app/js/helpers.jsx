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

export const getCenterIndex = length => (
  (length % 2 === 0)
    ? length / 2
    : Math.round(length / 2)
);

export function sortCenter(array, id) {
  const origIndex = array.findIndex(el => el.id === id);

  const sliced =
    array
      .slice(0, origIndex)
      .concat(array.slice(origIndex + 1, array.length));

  const slicedLength = sliced.length;

  const slicedCenterIndex = getCenterIndex(slicedLength);

  const combined =
    sliced
      .slice(0, slicedCenterIndex)
      .concat([array[origIndex]])
      .concat(sliced.slice(slicedCenterIndex, slicedLength));

  return combined;
}

// export function sortCenter(array, id) {
//   const origIndex = array.findIndex(el => el.id === id);
//   if (origIndex > -1) {
//     const centerIndex = getCenterIndex(array);
//     return array.map(function (el, i) {
//       if (i === centerIndex - 1) return el;
//       if (el.id === id) return array[centerIndex - 1];
//       return el;
//     });
//   }
//   return array;
// }
