import React from 'react';
import SVGInline from 'react-svg-inline';
import PlayPauseButton from '../containers/PlayPauseButton.jsx';
import { handleSkip } from '../helpers.jsx';

const SongPlayerButton = ({ onClick, button, type, command }) => (
  type === 'play' ?
    <PlayPauseButton
      play={ button.play }
      pause={ button.pause }
    /> :
    <li onClick={ () => onClick(handleSkip(command, type)) }>
      <SVGInline svg={ button } />
    </li>
);

export default SongPlayerButton;
