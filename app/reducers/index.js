import { combineReducers } from 'redux';
import songPlayer from './songPlayer';
import albumLibrary from './albumLibrary';

const hcApp = combineReducers({
  songPlayer,
  albumLibrary,
});

export default hcApp;
