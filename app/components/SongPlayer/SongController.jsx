import React from 'react';

const SongController = props => (
  <div>
    <p onClick={ props.resume }>play</p>
    <p onClick={ props.pause }>pause</p>
  </div>
);

export default SongController;
