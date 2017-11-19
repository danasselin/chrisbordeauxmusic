import React from 'react';
import { connect } from 'react-redux';
import Album from '../containers/Album.jsx';
import AlbumPreviewCarousel from './AlbumPreviewCarousel.jsx';
import SongPlayer from '../containers/SongPlayer.jsx';
import { formatSong } from '../helpers.jsx';
import { setSelectedAlbum, selectSongFromAlbum } from '../actions';

class AlbumLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.selectedAlbum = props.songs || [];
  }

  componentWillMount() {
    this.props.fetchAlbum()
      .then(({ entries: songs }) => {
        const formatted = songs.map(formatSong);
        this.props.selectSongFromAlbum(formatted[0]);
        return formatted;
      })
      .then((songs) => {
        this.props.setSelectedAlbum(songs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { songs } = this.props;
    return (
      <section>
        <AlbumPreviewCarousel />
        <SongPlayer />
        <div>
          <Album songs={ songs } />
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ albumLibrary: { songs } }) => ({ songs });

const mapDispatchToProps = {
  selectSongFromAlbum,
  setSelectedAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumLibrary);
