import React from 'react';
import SongPlayerButton from './SongPlayerButton.jsx';

const SongPlayerDisplay = ({ btnOnClick }) => (
  <figure className='song-player'>
    <ul>
      {
        ['rewind', 'pause', 'play'].map((command, i) => (
          <SongPlayerButton
            onClick={ btnOnClick }
            type={ command }
            key={ i }
          />
        ))
      }
    </ul>
  </figure>
);

export default SongPlayerDisplay;
