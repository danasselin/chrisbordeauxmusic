import React from 'react';
import '../main.css';

const Song = ({ name, path }) => (
  <figure className='song' data-path={ path }>
    <div className='song-controller'>
      <h3>{ name }</h3>
    </div>
  </figure>
);

export default Song;
