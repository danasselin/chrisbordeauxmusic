import React from 'react';
import '../main.css';

const Song = ({ name, path, onClick }) => (
  <figure
    className='song'
    onClick={ () => onClick(path) }
  >
    <div className='song-controller'>
      <h3>{ name }</h3>
    </div>
  </figure>
);

export default Song;
