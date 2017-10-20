import React from 'react';
import SongPlayerButton from './SongPlayerButton.jsx';

const SongPlayerDisplay = ({ command, btnOnClick }) => (
  <figure className='song-player'>
    {`${command}`}
    <ul>
      {
        ['rewind', 'pause', 'play'].map((cmdString, i) => (
          <SongPlayerButton
            type={ cmdString }
            key={ i }
            onClick={ btnOnClick }
          />
        ))
      }
    </ul>
    <div className='visualizer'>
      <div className='visualizer-expander'></div>
    </div>
  </figure>
);

export default SongPlayerDisplay;
