import React from 'react';
import Song from '../containers/Song.jsx';

const Album = ({ songs }) => (
  <section className="content-box album">
    {
      songs ? songs.map(({ name, path }, i) => (
        <Song
          key={ i }
          songNumber={ i }
          name={ name }
          path={ path }
        />
      )) : null
    }
  </section>
);

export default Album;
