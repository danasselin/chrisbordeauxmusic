import React from 'react';
import { connect } from 'react-redux';
import { isSelectedSong } from '../helpers.jsx';
import '../main.css';

const Song = ({
  name,
  path,
  onClick,
  selectedSong,
  songNumber,
}) => (
  <figure
    className={ `song${isSelectedSong(name, selectedSong.name)}` }
    onClick={ () => onClick({ path, name, songNumber }) }
  >
    <div className='song-controller'>
      <h3>{ name }</h3>
    </div>
  </figure>
);

const mapStateToProps = ({ songPlayer: { selectedSong } }) => ({ selectedSong });

export default connect(mapStateToProps)(Song);
