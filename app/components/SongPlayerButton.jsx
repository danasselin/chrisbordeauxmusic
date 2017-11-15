import React from 'react';
import SVGInline from 'react-svg-inline';
import PlayPauseButton from '../containers/PlayPauseButton.jsx';
import { handleBack } from '../helpers.jsx';

const SongPlayerButton = ({ onClick, button, type, command }) => (
  type === 'play' ?
    <PlayPauseButton
      play={ button.play }
      pause={ button.pause }
    /> :
    <li onClick={ () => onClick(handleBack(command, type)) }>
      <SVGInline svg={ button } />
    </li>
);

export default SongPlayerButton;
