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
    this.player = new Player({
      updateSongTime: props.updateSongTime,
      selectSongFromAlbum: props.selectSongFromAlbum,
      setSongPlayerCmd: props.setSongPlayerCmd,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { command, selectedSong, songs } = nextProps;
    console.log(songs);
    if (selectedSong) {
      this.player.selectedSong = selectedSong;
    } else {
      this.player.selectedSong = songs[0];
    }
    this.player.executeCmd(command);
  }

  render() {
    return (
      <SongPlayerDisplay { ...this.props } />
    );
  }
}

const mapStateToProps = ({
  songPlayer: { command, selectedSong, songTime },
  albumLibrary: { songs },
  scores,
}) => ({ scores, command, songs, selectedSong, songTime });

const mapDispatchToProps = {
  updateSongTime,
  setSongPlayerCmd,
  selectSongFromAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
