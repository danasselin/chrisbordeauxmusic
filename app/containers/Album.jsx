import React from 'react';
import { connect } from 'react-redux';
import { selectSongFromAlbum } from '../actions';
import Song from '../components/Song.jsx';

const Album = ({ songs, onSongClick }) => (
  <section className="content-box album">
    {
      songs ? songs.map(({ name, path }, i) => (
        <Song
          key={ i }
          songNumber={ i }
          name={ name }
          path={ path }
          onClick={ onSongClick }
        />
      )) : null
    }
  </section>
);

const mapDispatchToProps = { onSongClick: selectSongFromAlbum };

export default connect(null, mapDispatchToProps)(Album);
