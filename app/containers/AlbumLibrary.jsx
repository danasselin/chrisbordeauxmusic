import React from 'react';
import { connect } from 'react-redux';
import Album from '../components/Album.jsx';
import { setSelectedAlbum } from '../actions';

class AlbumLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.selectedAlbum = props.songs || [];
  }

  fetchAlbum(path = null) {
    if (!this.selectedAlbum || !path) {
      this.props.fetchAlbum()
        .then(({ entries: songs }) => {
          this.props.dispatch(setSelectedAlbum(songs));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentWillMount() {
    this.fetchAlbum();
  }

  render() {
    const { albumTitles, songs } = this.props;
    return (
      <section>
        <ul>
          { albumTitles.map((title, i) => <li key={ i }>{ title }</li>) }
        </ul>
        <div>
          { <Album songs={ songs } /> }
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({ songs: state.songs });

export default connect(mapStateToProps)(AlbumLibrary);
