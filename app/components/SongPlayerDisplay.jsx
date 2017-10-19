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
  </figure>
);

export default SongPlayerDisplay;
