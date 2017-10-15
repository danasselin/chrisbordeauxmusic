import React from 'react';
import SongController from './SongController.jsx';
import '../../main.css';

class Song extends React.Component {
  constructor(props) {
    super(props);
    const {
      path_lower: pathLower,
      content_hash: contentHash,
      id,
    } = props.info;
    this.path = pathLower;
    this.contentHash = contentHash;
    this.id = id;
    this.state = {};
  }

  render() {
    const { name } = this.props.info;
    return (
      <figure className="song">
        <div className="song-controller">
          <h3>{ name }</h3>
          <SongController
            resume={ () => this.props.updatePlayer(this.path) }
            pause={ this.props.pause }
          />
        </div>
      </figure>
    );
  }
}

export default Song;
