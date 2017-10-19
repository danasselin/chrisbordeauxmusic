import React from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album.jsx';
import SongPlayer from '../containers/SongPlayer.jsx';
import { setSelectedAlbum, selectSongFromAlbum } from '../actions';

class AlbumLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.selectedAlbum = props.songs || [];
  }

  fetchInitialAlbum(path) {
    if (!this.selectedAlbum || !path) {
      this.props.fetchAlbum()
        .then(({ entries: songs }) => {
          this.props.setSelectedAlbum(songs);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentWillMount() {
    this.fetchInitialAlbum();
  }

  render() {
    const { albumTitles, songs, selectSongFromAlbum: select } = this.props;
    return (
      <section>
        <ul>
          { albumTitles.map((title, i) => <li key={ i }>{ title }</li>) }
        </ul>
        <SongPlayer />
        <div>
          <Album
            songs={ songs }
            onSongClick={ select }
          />
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
