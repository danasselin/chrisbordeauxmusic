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
      selectSong,
      setCmd,
      selectedSong,
      album,
    } = this.props;

    const albumInfoClasses = (function () {
      const defaultClasses = 'card scorecard';
      const isSelectedAlbum = album ? album.title === title : false;
      return isSelectedAlbum ? `selected ${defaultClasses}` : defaultClasses;
    }());

    const songStickerClasses = function (song, currentTitle) {
      const defaultClasses = `song-sticker ${title.toLowerCase().replace(' ', '-')}`;
      return (
        song && song.title === currentTitle
          ? `${defaultClasses} selected`
          : defaultClasses
      );
    };

    return (
      <div onClick={this.props.onClick} className={albumInfoClasses}>
        <div className='album-info-listing'>
          <h4>{title}</h4>
          <p>directed by {director}</p>
          <p>released in {releaseDate}</p>
        </div>
        <ul className='album-song-listing'>
          {
            songData
              ? songData.map(({ title: name, path }, i) => (
                <SongSticker
                  classes={ songStickerClasses(selectedSong, name) }
                  name={ name }
                  key={ i }
                  src={ path }
                  onClick={ function () {
                    selectSong({ path, title: name });
                    setCmd('queued');
                  } }
                />
              ))
              : null
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({
  albumLibrary: {
    album,
  },
  songPlayer: {
    selectedSong,
  },
}) => ({ album, selectedSong });

const mapDispatchToProps = {
  selectSong: selectSongFromAlbum,
  setCmd: setSongPlayerCmd,
};
export default connect(mapStateToProps, mapDispatchToProps)(FilmScoreItem);
