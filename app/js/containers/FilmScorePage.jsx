import React from 'react';
import { connect } from 'react-redux';
import { scrollToPreview } from '~/app/js/actions';
import FilmScoreItem from '~/app/js/components/FilmScoreItem.jsx';

const renderScores = (onClick, {
  title,
  director,
  release_date: releaseDate,
  id,
}, i) => (
  <FilmScoreItem
    onClick={onClick.bind(null, id)}
    key={i}
    title={title}
    director={director}
    releaseDate={releaseDate}
  />
);

class FilmScorePage extends React.Component {
  render() {
    return (
      <div className="card shaded padded">
        <h3>Film Scores</h3>
        {this.props.scores.map(renderScores.bind(null, this.props.scoreOnClick))}
      </div>
    );
  }
}

const mapDispatchToProps = { scoreOnClick: scrollToPreview };
const mapStateToProps = ({ scores }) => ({ scores });
export default connect(mapStateToProps, mapDispatchToProps)(FilmScorePage);
