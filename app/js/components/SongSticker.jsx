import React from 'react';

const SongSticker = ({ name, onClick, classes }) => (
  <li className={ classes } onClick={ onClick }>{name}</li>
);

export default SongSticker;
