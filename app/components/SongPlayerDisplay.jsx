import React from 'react';
import SongPlayerButton from './SongPlayerButton.jsx';
import rewind from '../../public/SVG/rewind.svg';
import play from '../../public/SVG/play.svg';
import pause from '../../public/SVG/pause.svg';
import forward from '../../public/SVG/forward.svg';

const btnData = {
  rewind,
  play: { play, pause },
  forward,
};

const SongPlayerDisplay = ({
  btnOnClick,
  selectedSongName,
  songTime,
}) => (
  <div className='song-player'>
    <figcaption className='song-player-caption'>
      { selectedSongName }
    </figcaption>
    <p>{ songTime }</p>
    <figure className='progress-bar'>
      <ul className="button-bar">
        {
          Object.entries(btnData).map(([name, value], i) => (
            <SongPlayerButton
              key={ i }
              type={ name }
              button={ value }
              onClick={ btnOnClick }
            />
          ))
        }
      </ul>
    </figure>
  </div>
);

export default SongPlayerDisplay;
