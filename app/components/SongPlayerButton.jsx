import React from 'react';

const SongPlayerButton = ({ onClick, type }) => (
  <li onClick={ () => onClick(type) }>{ type }</li>
);

export default SongPlayerButton;
