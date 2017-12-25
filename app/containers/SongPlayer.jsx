import React from 'react';
import { connect } from 'react-redux';
import SongPlayerDisplay from './SongPlayerDisplay.jsx';
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
    const { command, selectedSong } = nextProps;
    this.player.selectedSong = selectedSong;
    // this.player.songs = nextProps.songs;
    this.player.executeCmd(command);
  }

  render() {
    return (
      <SongPlayerDisplay />
    );
  }
}

const mapStateToProps = ({
  songPlayer: { command, selectedSong },
  albumLibrary: { songs },
}) => ({ command, songs, selectedSong });

const mapDispatchToProps = {
  updateSongTime,
  btnOnClick: setSongPlayerCmd,
  selectSongFromAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
