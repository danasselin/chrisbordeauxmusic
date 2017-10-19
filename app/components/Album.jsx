import React from 'react';
import Song from './Song.jsx';

const Album = ({ songs, onSongClick }) => (
  <section className="content-box album">
    {
      songs ? songs.map(({ name, path_lower: pathLower }, i) => (
        <Song
          key={ i }
          name={ name }
          path={ pathLower }
          onClick={ onSongClick }
        />
      )) : null
    }
  </section>
);

export default Album;
