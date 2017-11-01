import React from 'react';
import { connect } from 'react-redux';
import SongPlayerDisplay from '../components/SongPlayerDisplay.jsx';
import { setSongPlayerCmd } from '../actions';
import Player from '../services/Song/Player';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = new Player();
  }
  componentWillReceiveProps(nextProps) {
    const {
      command,
      selectedSong,
      songs,
    } = nextProps;
    const path = selectedSong ? selectedSong.path : songs[0].path_lower;
    this.player.executeCmd(command, path);
  }

  render() {
    const {
      command,
      btnOnClick,
      selectedSong,
    } = this.props;
    return (
      <SongPlayerDisplay
        command={ command }
        btnOnClick={ btnOnClick }
        selectedSongName={ selectedSong ? selectedSong.name : 'initial state' }
      />
    );
  }
}

const mapStateToProps = ({
  songPlayer: { command, selectedSong },
  albumLibrary: { songs },
}) => ({ command, selectedSong, songs });

const mapDispatchToProps = { btnOnClick: setSongPlayerCmd };

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
