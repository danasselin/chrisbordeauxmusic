import React from 'react';
import Album from '../Album.jsx';

const equal = require('deep-equal');

class AlbumLibrary extends React.Component {
  constructor(props) {
    super(props);
    // I know this sux but it's only temp
    this.state = window.selectedAlbum || {};
  }

  fetchAlbum() {
    if (!equal(window.currentAlbum, this.state)) {
      this.props.fetchAlbum()
        .then(({ entries: songs }) => {
          window.selectedAlbum = { songs };
          this.setState({ songs });
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
    const { albumTitles } = this.props;
    const { songs } = this.state;
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

export default AlbumLibrary;
