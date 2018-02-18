import React from 'react';
import { connect } from 'react-redux';
import {
  setSongPlayerCmd,
  updateSongTime,
  selectSongFromAlbum,
  setSelectedAlbum,
} from '~/app/js/actions';
import Player from '~/app/js/services/Song/Player';
import SongPlayerDisplay from './SongPlayerDisplay.jsx';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = new Player(props);
  }

  componentDidMount() {
    const initialAlbum = this.props.scores[0];
    this.props.setSelectedAlbum({
      title: initialAlbum.title,
      songs: initialAlbum.srcs,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { command, selectedSong, album } = nextProps;
    if (this.player.album.title !== album.title) {
      this.player.album = album;
      this.props.setSongPlayerCmd('queued');
      this.player.setPlayerProgressColor(album.title);
    }
    if (selectedSong) {
      this.player.selectedSong = selectedSong;
    } else {
      this.player.selectedSong = album.songs[0];
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
  albumLibrary: { album },
  scores,
}) => ({ scores, command, album, selectedSong, songTime });

const mapDispatchToProps = {
  updateSongTime,
  setSongPlayerCmd,
  selectSongFromAlbum,
  setSelectedAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
