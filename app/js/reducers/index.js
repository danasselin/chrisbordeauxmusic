import { combineReducers } from 'redux';
import songPlayer from './songPlayer';
import albumLibrary from './albumLibrary';
import albumPreviewCarousel from './albumPreviewCarousel';
import scores from './scores';

const hcApp = combineReducers({
  songPlayer,
  albumLibrary,
  albumPreviewCarousel,
  scores,
});

export default hcApp;
