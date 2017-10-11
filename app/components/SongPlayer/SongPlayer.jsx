import React from 'react';
// import Song from './Song.jsx';

const Dropbox = require('dropbox');

class SongPlayer extends React.Component {
  constructor() {
    super();
    this.dropboxToken = process.env.DROPBOX_TOKEN;
    this.state = {};
  }
  componentWillMount() {
    const dbx = new Dropbox({ accessToken: this.dropboxToken });
    dbx.filesListFolder({ path: '/dan/ cut up final tracks/mp3' })
      .then(({ entries }) => {
        this.setState({ album: entries });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { album } = this.state;
    return (
      <section className="content-box song-player">
        <h3>Fossil Fuel Kid</h3>
        {
          album ? album.map((song, i) => (
            <p>{ `${i + 1}.${song.name}` }</p>
          )) : null
        }
      </section>
    );
  }
}

export default SongPlayer;
