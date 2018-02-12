import React from 'react';
import { connect } from 'react-redux';
import SongSticker from '~/app/js/components/SongSticker.jsx';
import { selectSongFromAlbum, setSongPlayerCmd } from '~/app/js/actions';

class FilmScoreItem extends React.Component {
  render() {
    const {
      title,
      director,
      releaseDate,
      songData,
      songOnClick,
      setCmd,
    } = this.props;

    return (
      <div className='card scorecard'>
        <h4 onClick={this.props.onClick}>{title}</h4>
        <p>{director}</p>
        <p>{releaseDate}</p>
        <ul>
          {
            Object.entries(songData[0]).map(([key, value]) => (
              <SongSticker
                name={ key }
                src={ value }
                onClick={ function () {
                  songOnClick(value);
                  setCmd('queued');
                } }
              />
            ))
          }
        </ul>
        <hr className="divider" />
      </div>
    );
  }
}

const mapDispatchToProps = {
  songOnClick: selectSongFromAlbum,
  setCmd: setSongPlayerCmd,
};
export default connect(null, mapDispatchToProps)(FilmScoreItem);

