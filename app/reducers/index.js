import { combineReducers } from 'redux';
import songPlayer from './songPlayer';
import albumLibrary from './albumLibrary';
import albumPreviewCarousel from './albumPreviewCarousel';

const hcApp = combineReducers({
  songPlayer,
  albumLibrary,
  albumPreviewCarousel,
});

export default hcApp;
