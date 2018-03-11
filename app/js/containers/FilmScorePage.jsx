import React from 'react';
import { connect } from 'react-redux';
import {
  scrollToPreview,
  setSelectedAlbum,
  selectSongFromAlbum,
  setSongPlayerCmd,
} from '~/app/js/actions';
import FilmScoreItem from './FilmScoreItem.jsx';

const renderScores = (onClick, {
  title,
  director,
  release_date: releaseDate,
  srcs,
  co_composers: coComposers,
}, i) => (
  <FilmScoreItem
    onClick={onClick.bind(null, i, srcs)}
    key={i}
    title={title}
    director={director}
    releaseDate={releaseDate}
    coComposers={coComposers}
    songData={srcs}
  />
);

class FilmScorePage extends React.Component {
  componentDidMount() {
    this.props.selectSongFromAlbum(this.props.scores[0].srcs[0]);
  }

  render() {
    const updater = (i, srcs) => {
      this.props.scoreOnClick({
        preview: this.props.scores[i],
        index: i,
        direction: null,
      });
      this.props.setSelectedAlbum({
        title: this.props.scores[i].title,
        songs: srcs,
      });
      this.props.setSongPlayerCmd('queued');
    };
    return (
      <div className="card shaded padded">
        <h3>Film Scores</h3>
        { this.props.scores.map(renderScores.bind(null, updater)) }
      </div>
    );
  }
}

const mapDispatchToProps = {
  scoreOnClick: scrollToPreview,
  setSelectedAlbum,
  selectSongFromAlbum,
  setSongPlayerCmd,
};
const mapStateToProps = ({ scores }) => ({ scores });
export default connect(mapStateToProps, mapDispatchToProps)(FilmScorePage);
