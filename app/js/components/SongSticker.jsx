import React from 'react';

const SongSticker = ({ name, onClick }) => (
  <li onClick={ onClick }>{name}</li>
);

export default SongSticker;
