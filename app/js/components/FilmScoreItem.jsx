import React from 'react';

const FilmScoreItem = ({
  onClick,
  title,
  director,
  releaseDate,
}) => (
  <div
    onClick={onClick}
    className='card scorecard'>
    <h4>{title}</h4>
    <p>{director}</p>
    <p>{releaseDate}</p>
    <hr className="divider" />
  </div>
);

export default FilmScoreItem;
