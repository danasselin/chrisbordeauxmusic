import React from 'react';
import { connect } from 'react-redux';
import SVGInline from 'react-svg-inline';
import { setSongPlayerCmd } from '../actions';

const PlayPauseButton = ({ command, play, pause, onClick }) => (
  (command === 'queued' || command === 'pause') ?
    <li onClick={ () => onClick('play') }>
      <SVGInline svg={ play } />
    </li> :
    <li onClick={ () => onClick('pause') }>
      <SVGInline svg={ pause } />
    </li>
);

const mapStateToProps = ({ songPlayer: { command } }) => ({ command });
const mapDispatchToProps = ({ onClick: setSongPlayerCmd });

export default connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton);
