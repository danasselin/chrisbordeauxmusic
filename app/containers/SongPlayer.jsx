import { connect } from 'react-redux';
import SongPlayerDisplay from '../components/SongPlayerDisplay.jsx';
import { setSongPlayerCmd } from '../actions';

class Player {
  play() {
    console.log('playing');
  }
}

const player = new Player();

const executeSongPlayerCmd = (command) => {
  switch (command) {
    case 'play':
      return player.play();
    default:
      throw new Error(`Unknown playback type: ${command}`);
  }
};

const mapStateToProps = state => (
  { SongPlayerButton: executeSongPlayerCmd(state.songPlayer.command) }
);

const mapDispatchToProps = { btnOnClick: setSongPlayerCmd };

const SongPlayer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SongPlayerDisplay);

export default SongPlayer;
