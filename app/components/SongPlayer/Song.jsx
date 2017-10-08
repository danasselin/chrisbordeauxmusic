import React from 'react';

class Song extends React.Component {
  render() {
    const { song, trackNo } = this.props.info;
    const formattedName = `${trackNo}. ${song.name}`;
    return (
      <figure className="song">
        <div className="song-image-placeholder"></div>
        <div className="song-controller">
          <h3>{ formattedName }</h3>
        </div>
      </figure>
    );
  }
}

export default Song;
