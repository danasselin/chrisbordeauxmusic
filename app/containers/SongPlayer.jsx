import React from 'react';
import { connect } from 'react-redux';
import SongPlayerDisplay from '../components/SongPlayerDisplay.jsx';
import {
  setSongPlayerCmd,
  updateSongTime,
  selectSongFromAlbum,
} from '../actions';
import Player from '../services/Song/Player';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = new Player(
      props.updateSongTime,
      props.selectSongFromAlbum,
    );
  }

  componentWillReceiveProps(nextProps) {
    this.player.songs = nextProps.songs;
    const {
      command,
      selectedSong: {
        path, songNumber,
      },
    } = nextProps;
    this.player.executeCmd(command, path, songNumber);
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
  selectSongFromAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
