import React from 'react';
import '../../main.css';

class Song extends React.Component {
  render() {
    const { song } = this.props.info;
    return (
      <figure className="song">
        <div className="song-img-placeholder"></div>
        <div className="song-controller">
          <h3>{ song.name }</h3>
        </div>
      </figure>
    );
  }
}

export default Song;
