import SongPlayer from './components/SongPlayer/SongPlayer.jsx';
import VideoPlayer from './components/VideoPlayer/VideoPlayer.jsx';
import { PressPage } from './components/PressPage.jsx';
import { ShowsPage } from './components/ShowsPage.jsx';
import { BlogPage } from './components/BlogPage.jsx';
import { dbx } from './helpers.jsx';

export const HcSiteRoutes = [
  {
    path: '/listen',
    component: SongPlayer,
    propsData: { dbx },
  },
  {
    path: '/video',
    component: VideoPlayer,
  },
  {
    path: '/press',
    component: PressPage,
  },
  {
    path: '/shows',
    component: ShowsPage,
  },
  {
    path: '/blog',
    component: BlogPage,
  },
];
