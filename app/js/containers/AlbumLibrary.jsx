import React from 'react';
import { connect } from 'react-redux';
import AlbumPreviewCarousel from './AlbumPreviewCarousel.jsx';
import { setSelectedAlbum, selectSongFromAlbum } from '../actions';

class AlbumLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.selectedAlbum = props.songs || [];
  }

  componentWillMount() {
    //   .then((data) => {
    //     console.log(data);
    // const formatted = songs.map(formatSong);
    // this.props.selectSongFromAlbum(formatted[0]);
    // return formatted;
  // })
  // .then((songs) => {
  //   this.props.setSelectedAlbum(songs);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  }

  render() {
    return (
      <section className="player-container card shaded">
        <figure className="profile-temporary">
          <h1>Chris Bordeaux</h1>
        </figure>
        <AlbumPreviewCarousel { ...this.props } />
      </section>
    );
  }
}

const mapStateToProps = ({ scores }) => ({ scores });

const mapDispatchToProps = {
  selectSongFromAlbum,
  setSelectedAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumLibrary);
