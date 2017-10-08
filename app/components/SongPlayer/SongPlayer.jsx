import React from 'react';
import Song from './Song.jsx'; // eslint-disable-line no-unused-vars

class SongPlayer extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <section className="listener">
        {/* hard code album name for now */}
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
