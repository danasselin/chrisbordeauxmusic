import React from 'react';
// import SVGInline from 'react-svg-inline';
import PlayPauseButton from '../containers/PlayPauseButton.jsx';
import { handleSkip } from '../helpers.jsx';

const SongPlayerButton = ({ onClick, button, type, command }) => (
  type === 'play' ?
    <PlayPauseButton
      play={ button.play }
      pause={ button.pause }
    /> :
    <i
      onClick={() => onClick(handleSkip(command, type))}
      className={`fa ${button}`}
      aria-hidden="true">
    </i>
);

export default SongPlayerButton;
