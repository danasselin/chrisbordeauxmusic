import React from 'react';
import { connect } from 'react-redux';
import { scrollToPreview } from '~/app/js/actions';
import FilmScoreItem from '~/app/js/components/FilmScoreItem.jsx';
import filmScores from '~/app/site_data/film_scores.json';

const renderScores = (onClick, {
  title,
  director,
  thumbnail,
  release_date: releaseDate,
  id,
}, i) => (
  <FilmScoreItem
    onClick={onClick.bind(null, id)}
    key={i}
    title={title}
    director={director}
    thumbnail={thumbnail}
    releaseDate={releaseDate}
  />
);

const FilmScorePage = ({ scoreOnClick, scores }) => (
  <div className="card shaded padded">
    <h3>Film Scores</h3>
    { scores.map(renderScores.bind(null, scoreOnClick)) }
  </div>
);

const mapDispatchToProps = { scoreOnClick: scrollToPreview };
export default connect(null, mapDispatchToProps)(FilmScorePage);
