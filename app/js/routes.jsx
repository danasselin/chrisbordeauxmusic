import landline from '~/app/images/Landline-movie-poster.jpg';
import obviousChild from '~/app/images/Obvious-child-movie-poster.jpg';
import lastTemptation from '~/app/images/last-temptation-of-christ-movie-poster.jpg';
import filmScores from '~/app/site_data/film_scores.json';
import AlbumLibrary from './containers/AlbumLibrary.jsx';
import { PressPage } from './components/PressPage.jsx';
import FilmScorePage from './containers/FilmScorePage.jsx';
import { fetchAlbum } from './helpers.jsx';

const imgs = {
  landline,
  obviousChild,
  lastTemptation,
};

const addImgToFilmScores = scores => (
  scores.map(value => ({ ...value, img: imgs[value.id] }))
);

console.log(addImgToFilmScores(filmScores.films));

export const HcSiteRoutes = [
  {
    path: '/film-scores',
    component: FilmScorePage,
    propsData: {
      scores: addImgToFilmScores(filmScores.films),
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
