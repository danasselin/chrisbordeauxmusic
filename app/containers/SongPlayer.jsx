import React from 'react';
import { connect } from 'react-redux';
import SongPlayerDisplay from '../components/SongPlayerDisplay.jsx';
import { setSongPlayerCmd, updateSongTime } from '../actions';
import Player from '../services/Song/Player';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = new Player(props.updateSongTime);
  }
  componentWillReceiveProps(nextProps) {
    const {
      command,
      selectedSong,
    } = nextProps;
    const path = selectedSong.path_lower || selectedSong.path;
    this.player.executeCmd(command, path);
  }

  render() {
    const {
      command,
      btnOnClick,
      selectedSong,
      songTime,
    } = this.props;
    return (
      <SongPlayerDisplay
        command={ command }
        songTime={ songTime }
        btnOnClick={ btnOnClick }
        selectedSongName={
          selectedSong ?
            selectedSong.name :
            'Loading song . . .'
        }
      />
    );
  }
}

const mapStateToProps = ({
  songPlayer: { command, selectedSong, songTime },
  albumLibrary: { songs },
}) => ({ command, selectedSong, songs, songTime });

const mapDispatchToProps = {
  updateSongTime,
  btnOnClick: setSongPlayerCmd,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
