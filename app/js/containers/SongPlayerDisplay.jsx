import React from 'react';
import { connect } from 'react-redux';
import { setSongPlayerCmd, selectSongFromAlbum } from '../actions';
import SongPlayerButton from '../components/SongPlayerButton.jsx';

const btnData = {
  rewind: 'fa-backward fa-3x',
  play: {
    play: 'fa-play fa-3x',
    pause: 'fa-pause fa-3x',
  },
  forward: 'fa-forward fa-3x',
};

const NowPlayingBanner = ({ selectedSong, scores, songTime }) => {
  const currentSong = (function () {
    if (selectedSong) {
      return selectedSong.title;
    }
    return scores[0].srcs[0].title;
  }());

  const nowPlayingText = `Now Playing: ${currentSong}`;

  return (
    <div className='now-playing'>
      <div className="selected-song">
        <h4>{ nowPlayingText }</h4>
      </div>
      <p className="song-time">{ songTime }</p>
    </div>
  );
};

class SongPlayerDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { album } = this.props;
    if (album) {
      if (album.title !== nextProps.album.title) {
        if (this.props.selectedSong !== nextProps.selectedSong) {
          this.props.selectSongFromAlbum(nextProps.selectedSong);
        } else {
          this.props.selectSongFromAlbum(nextProps.album.songs[0]);
        }
      }
    }
  }
  render() {
    const {
      btnOnClick,
      command,
    } = this.props;
    return (
      <div className='song-player'>
        <NowPlayingBanner { ...this.props } />
        <figure className='progress-bar'>
          <ul className="button-bar">
            {
              Object.entries(btnData).map(([name, icon], i) => (
                <SongPlayerButton
                  key={ i }
                  type={ name }
                  button={ icon }
                  onClick={ btnOnClick }
                  command={ command }
                />
              ))
            }
          </ul>
        </figure>
      </div>
    );
  }
}
const mapStateToProps = ({
//   songPlayer: { command, selectedSong, songTime },
  albumLibrary: { album },
//   scores,
}) => ({ album });
const mapDispatchToProps = {
  btnOnClick: setSongPlayerCmd,
  selectSongFromAlbum,
};
export default connect(mapStateToProps, mapDispatchToProps)(SongPlayerDisplay);
