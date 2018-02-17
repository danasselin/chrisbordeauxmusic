import React from 'react';
import { connect } from 'react-redux';
import { setSongPlayerCmd } from '../actions';
import SongPlayerButton from '../components/SongPlayerButton.jsx';

const btnData = {
  rewind: 'fa-backward fa-3x',
  play: {
    play: 'fa-play fa-3x',
    pause: 'fa-pause fa-3x',
  },
  forward: 'fa-forward fa-3x',
};

const SongPlayerDisplay = ({
  btnOnClick,
  selectedSong,
  songTime,
  command,
}) => (
  <div className='song-player'>
    <figcaption className='song-player-caption'>
      { selectedSong || 'Loading song . . .' }
    </figcaption>
    <p className="song-time">{ songTime }</p>
    <figure className='progress-bar'>
      <ul className="button-bar">
        {
          Object.entries(btnData).map(([name, icon], i) => (
            <SongPlayerButton
              key={ i }
              type={ name }
              button={ icon }
              onClick={ btnOnClick }
              command={ command }
            />
          ))
        }
      </ul>
    </figure>
  </div>
);

const mapStateToProps = ({
  songPlayer: { command, selectedSong, songTime },
}) => ({ command, selectedSong, songTime });

const mapDispatchToProps = { btnOnClick: setSongPlayerCmd };

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayerDisplay);
