import filmScores from '~/app/site_data/film_scores.json';
import AlbumLibrary from './containers/AlbumLibrary.jsx';
import { PressPage } from './components/PressPage.jsx';
import FilmScorePage from './containers/FilmScorePage.jsx';
import { fetchAlbum } from './helpers.jsx';

export const HcSiteRoutes = [
  {
    path: '/film-scores',
    component: FilmScorePage,
    propsData: {
      scores: filmScores.films,
    },
  },
  {
    path: '/songs',
    component: AlbumLibrary,
    propsData: {
      fetchAlbum,
    },
  },
  {
    path: '/press',
    component: PressPage,
  },
];
