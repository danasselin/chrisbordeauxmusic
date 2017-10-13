import React from 'react';
import Song from './Song.jsx';
import { dbxAlbumPath } from '../../constants';
import { fetchSongPlayData } from '../../helpers.jsx';

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchSongNames = props.fetch.bind(this);
    this.state = {};
  }
  componentWillMount() {
    this.fetchSongNames(dbxAlbumPath);
  }

  render() {
    const { album } = this.state;
    return (
      <section className="content-box song-player">
        <h3>Fossil Fuel Kid</h3>
        {
          album ? album.map((song, i) => (
            <Song info={ song } key={ i } fetch={ fetchSongPlayData } />
          )) : null
        }
      </section>
    );
  }
}

export default SongPlayer;
