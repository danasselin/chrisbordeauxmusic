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
      <div onClick={this.props.onClick} className='card scorecard'>
        <h4>{title}</h4>
        <p>{director}</p>
        <p>{releaseDate}</p>
        <ul>
          {
            songData
              ? songData.map(({ title: name, path }, i) => (
                <SongSticker
                  name={ name }
                  key={ i }
                  src={ path }
                  onClick={ function () {
                    songOnClick({ path, name });
                    setCmd('queued');
                  } }
                />
              ))
              : null
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
