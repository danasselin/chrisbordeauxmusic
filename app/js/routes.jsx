import { PressPage } from './components/PressPage.jsx';
import FilmScorePage from './containers/FilmScorePage.jsx';
import OtherMusic from './components/OtherMusicPage.jsx';

export const HcSiteRoutes = [
  {
    path: '/film-scores',
    component: FilmScorePage,
  },
  {
    path: '/other-music',
    component: OtherMusic,
  },
  {
    path: '/press',
    component: PressPage,
  },
];
