import React from 'react';
import { connect } from 'react-redux';
import SongPlayerDisplay from '../components/SongPlayerDisplay.jsx';
import { setSongPlayerCmd } from '../actions';
import Player from '../services/Song/Player';

class SongPlayer extends React.Component {
  constructor() {
    super();
    this.player = new Player();
  }
  componentWillReceiveProps(nextProps) {
    const {
      command,
      selectedSong,
      songs,
    } = nextProps;
    this.player.executeCmd(command, selectedSong || songs[0].path_lower);
  }

  render() {
    const { command, btnOnClick } = this.props;
    return (
      <SongPlayerDisplay
        command={ command }
        btnOnClick={ btnOnClick }
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
