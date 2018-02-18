import React from 'react';
import { connect } from 'react-redux';
import { scrollToPreview, setSelectedAlbum } from '~/app/js/actions';
import FilmScoreItem from './FilmScoreItem.jsx';

const renderScores = (onClick, {
  title,
  director,
  release_date: releaseDate,
  srcs,
}, i) => (
  <FilmScoreItem
    onClick={onClick.bind(null, i, srcs)}
    key={i}
    title={title}
    director={director}
    releaseDate={releaseDate}
    songData={srcs}
  />
);

class FilmScorePage extends React.Component {
  render() {
    const updater = (i, srcs) => {
      this.props.scoreOnClick({ preview: this.props.scores[i], index: i, direction: null });
      this.props.setSelectedAlbum({
        title: this.props.scores[i].title,
        songs: srcs,
      });
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
};
const mapStateToProps = ({ scores }) => ({ scores });
export default connect(mapStateToProps, mapDispatchToProps)(FilmScorePage);
