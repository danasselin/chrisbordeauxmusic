import React from 'react';
import { connect } from 'react-redux';
// import SVGInline from 'react-svg-inline';
import { setSongPlayerCmd } from '../actions';

const PlayPauseButton = ({ command, play, pause, onClick }) => (
  (command !== 'play') ?
    <i
      onClick={() => onClick('play')}
      className={`fa ${play}`}
      aria-hidden="true">
    </i>
    :
    <i
      onClick={() => onClick('pause')}
      className={`fa ${pause}`}
      aria-hidden="true">
    </i>
);

const mapStateToProps = ({ songPlayer: { command } }) => ({ command });
const mapDispatchToProps = ({ onClick: setSongPlayerCmd });

export default connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton);
