import { connect } from 'react-redux';
import SongPlayerDisplay from '../components/SongPlayerDisplay.jsx';
import { setSongPlayerCmd } from '../actions';

const mapStateToProps = ({ songPlayer: { command } }) => ({ command });

const mapDispatchToProps = { btnOnClick: setSongPlayerCmd };

const SongPlayer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SongPlayerDisplay);

export default SongPlayer;
