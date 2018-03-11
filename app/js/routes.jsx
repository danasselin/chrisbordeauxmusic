import ContactPage from './components/ContactPage.jsx';
import FilmScorePage from './containers/FilmScorePage.jsx';
import OtherMusic from './components/OtherMusicPage.jsx';
import AboutPage from './components/AboutPage.jsx';

export const HcSiteRoutes = [
  {
    path: '/',
    redirect: {
      to: '/film-scores',
    },
    component: FilmScorePage,
  },
  {
    path: '/film-scores',
    component: FilmScorePage,
  },
  {
    path: '/other-music',
    component: OtherMusic,
  },
  {
    path: '/contact',
    component: ContactPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
];
