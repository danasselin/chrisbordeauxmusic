import React from 'react';
import { connect } from 'react-redux';
import SongPlayerDisplay from '../components/SongPlayerDisplay.jsx';
import { setSongPlayerCmd, updateSongTime } from '../actions';
import Player from '../services/Song/Player';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = new Player(props.onSongPlay);
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
  onSongPlay: updateSongTime,
  btnOnClick: setSongPlayerCmd,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
