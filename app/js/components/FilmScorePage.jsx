import React from 'react';
import filmScores from '~/app/site_data/film_scores.json';

const renderScores = function ({
  title,
  director,
  thumbnail,
  release_date: releaseDate,
}, i) {
  return (
    <div className='card' key={i}>
      <h4>{title}</h4>
      <p>{director}</p>
      <p>{thumbnail}</p>
      <p>{releaseDate}</p>
      <hr className="divider" />
    </div>
  );
};

export function FilmScorePage() {
  return (
    <div className="card shaded padded">
      <h3>Film Scores</h3>
      {
        filmScores.films.map(renderScores)
      }
    </div>
  );
}
