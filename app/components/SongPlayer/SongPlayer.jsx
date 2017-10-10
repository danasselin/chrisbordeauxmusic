import React from 'react';
import Song from './Song.jsx';

const Dropbox = require('dropbox');

class SongPlayer extends React.Component {
  constructor() {
    super();
    this.dropboxToken = process.env.DROPBOX_TOKEN;
    this.dropboxSec = process.env.DROPBOX_SEC;
  }
  componentWillMount() {
    const dbx = new Dropbox({ accessToken: this.dropboxToken });
    dbx.filesListFolder({ path: '/dan/ cut up final tracks/mp3' })
      .then(function(response) { // eslint-disable-line space-before-function-paren
        console.log(response);
      })
      .catch(function(error) { // eslint-disable-line space-before-function-paren
        console.log(error);
      });
  }

  render() {
    const { album } = this.props;
    return (
      <section className="content-box song-player">
        <h3>Fossil Fuel Kid</h3>
        {
          album ? album.map((song, i) => {
            const info = { song, trackNo: i + 1 };
            return <Song
              info={ info }
              key={ i }
            />;
          }) : null
        }
      </section>
    );
  }
}

export default SongPlayer;
