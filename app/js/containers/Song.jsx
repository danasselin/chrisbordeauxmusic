import React from 'react';
import { connect } from 'react-redux';
// import { isSelectedSong } from './../helpers.jsx';
import { isSelectedSong } from '~/app/js/helpers.jsx';
import { selectSongFromAlbum, setSongPlayerCmd } from './../actions';
import './../../css/main.css';

class Song extends React.Component {
  handleSongSelection() {
    const {
      songSelectAction,
      commandAction,
      path,
      name,
      songNumber,
    } = this.props;
    songSelectAction({ path, name, songNumber });
    commandAction('queued');
  }

  render() {
    const { name, selectedSong } = this.props;
    return (
      <figure
        className={ `song${isSelectedSong(name, selectedSong.name)}` }
        onClick={ () => this.handleSongSelection() }>
        <div className='song-controller'>
          <h3>{ name }</h3>
        </div>
      </figure>
    );
  }
}


const mapStateToProps = ({ songPlayer: { selectedSong } }) => ({ selectedSong });
const mapDispatchToProps = {
  songSelectAction: selectSongFromAlbum,
  commandAction: setSongPlayerCmd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Song);
