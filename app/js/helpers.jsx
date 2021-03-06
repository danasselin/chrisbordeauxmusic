import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import enrich from './util/enrich';
import dashCase from './util/dashCase';
import {
  defaultAlbumName,
  pathToScores,
  thumbnails,
  scoreSrcs,
} from './constants';

const nodePath = require('path');
const requestPromise = require('request-promise');
const Dropbox = require('dropbox');
const emoji = require('node-emoji');

// display helpers
export const isSelectedSong = (song1, song2) => (
  song1 === song2 ? ' selected' : ''
);

export const underConstructionEmojis = function () {
  let emojis = '';
  [1, 2, 3].forEach(() => {
    emojis += emoji.get('thinking_face');
  });
  return `  ${emojis}`;
};

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
      return (
        route.redirect
          ? <Redirect to={ route.redirect.to } />
          : <route.component { ...props } />
      );
    }}
  />
);

// Music API helpers

export const getAlbumPath = function (album, type) {
  if (type === 'score') {
    return nodePath.resolve(__dirname, pathToScores, album);
  }
  return null;
};

export const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

export function fetchAlbum(albumName = defaultAlbumName) {
  return requestPromise(`http://localhost:8080${getAlbumPath(albumName, 'score')}`);
}

export const thumbnailEnrich = target => (
  enrich({
    target,
    addOns: thumbnails,
    keyName: 'img',
    cb: (images, score) => images[score.id],
  })
);

export const songEnrich = target => (
  enrich({
    target,
    addOns: scoreSrcs,
    keyName: 'srcs',
    cb: (srcs, film) => {
      const filmId = dashCase(film.id);
      const source = srcs.find(src => src.name === filmId);
      return (
        source ?
          source.titles.map(title => ({
            title,
            path: `${pathToScores}/${dashCase(film.id)}/${title}.mp3`,
          })) : null
      );
    },
  })
);

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

