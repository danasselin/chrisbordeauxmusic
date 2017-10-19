import React from 'react';
import { connect } from 'react-redux';
import { selectSongFromAlbum } from '../actions';
import Song from '../components/Song.jsx';

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

const mapDispatchToProps = { onSongClick: selectSongFromAlbum };

export default connect(null, mapDispatchToProps)(Album);
