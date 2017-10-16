import React from 'react';
import Song from './Song.jsx';

const Album = ({ songs }) => (
  <section className="content-box song-player">
    <h3>Current Album: Fix later</h3>
    {
      songs ? songs.map(({ name, path_lower: pathLower }, i) => (
        <Song
          key={ i }
          name={ name }
          path={ pathLower }
        />
      )) : null
    }
  </section>
);

export default Album;
