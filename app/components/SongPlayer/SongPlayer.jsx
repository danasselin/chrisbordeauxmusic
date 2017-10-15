import React from 'react';
import Song from './Song.jsx';
import { dbxAlbumPath } from '../../constants';
import { fetchSongPlayData } from '../../helpers.jsx';

const equal = require('deep-equal');

class SongPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchSongNames = props.fetch.bind(this);
    this.player = props.player;
    this.state = window.currentAlbum || {};
    this.updatePlayer = this.updatePlayer.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.fetchedSongUrls = {};
  }

  componentWillMount() {
    this.fetchSongNames(dbxAlbumPath)
      .then(({ entries: album }) => {
        window.currentAlbum = { album };
        if (!equal(window.currentAlbum, this.state)) this.setState({ album });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  shouldFetchFromAPI(url) {
    return !(url in this.fetchedSongUrls);
  }

  updatePlayer(songUrl) {
    console.log(this.fetchedSongUrls);
    if (this.shouldFetchFromAPI(songUrl)) {
      fetchSongPlayData(songUrl)
        .then(({ link }) => {
          this.fetchedSongUrls[songUrl] = link;
          this.player.src = link;
          this.player.play();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.resume(songUrl);
    }
  }

  pause() {
    this.player.pause();
  }

  resume(url) {
    if (this.player.src !== this.fetchedSongUrls[url]) {
      this.player.src = this.fetchedSongUrls[url];
    }
    this.player.play();
  }

  render() {
    const { album } = this.state;
    return (
      <section className="content-box song-player">
        <h3>Fossil Fuel Kid</h3>
        {
          album ? album.map((song, i) => (
            <Song
              info={ song }
              key={ i }
              updatePlayer={ this.updatePlayer }
              pause={ this.pause }
              resume={ this.resume }
            />
          )) : null
        }
      </section>
    );
  }
}

export default SongPlayer;
