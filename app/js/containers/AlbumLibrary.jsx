import React from 'react';
import { connect } from 'react-redux';
import AlbumPreviewCarousel from './AlbumPreviewCarousel.jsx';
import { setSelectedAlbum, selectSongFromAlbum } from '../actions';

class AlbumLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.selectedAlbum = props.songs || [];
  }

  render() {
    return (
      <section className="player-container card shaded">
        <figure className="profile-temporary">
          <h1>Chris Bordeaux</h1>
          <h4>composer | songwriter</h4>
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
