import React from 'react';
import SVGInline from 'react-svg-inline';
import PlayPauseButton from '../containers/PlayPauseButton.jsx';

const SongPlayerButton = ({ onClick, button, type }) => (
  type === 'play' ?
    <PlayPauseButton
      play={ button.play }
      pause={ button.pause }
    /> :
    <li onClick={ () => onClick(type) }>
      <SVGInline svg={ button } />
    </li>
);

export default SongPlayerButton;
