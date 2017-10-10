import React from 'react';
import Song from './Song.jsx';

class SongPlayer extends React.Component {
  constructor() {
    super();
    this.clientId = process.env.SC_CLIENT_ID;
    this.clientSec = process.env.SC_CLIENT_SEC;
  }
  componentWillMount() {
    console.log(`Did this work? ${this.clientId}`);
    console.log(`Did this work? ${this.clientSec}`);
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
