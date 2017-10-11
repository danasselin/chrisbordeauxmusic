import React from 'react';
import Song from './Song.jsx';

class SongPlayer extends React.Component {
  constructor() {
    super();
    this.dropboxToken = process.env.DROPBOX_TOKEN;
    this.state = {};
  }
  componentWillMount() {
    this.props.dbx.filesListFolder({ path: '/dan/ cut up final tracks/mp3' })
      .then(({ entries }) => {
        this.setState({ album: entries });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { album } = this.state;
    const { dbx } = this.props;
    return (
      <section className="content-box song-player">
        <h3>Fossil Fuel Kid</h3>
        {
          album ? album.map((song, i) => (
            <Song info={ song } key={ i } dbx={ dbx } />
          )) : null
        }
      </section>
    );
  }
}

export default SongPlayer;
