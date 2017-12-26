import AlbumLibrary from './containers/AlbumLibrary.jsx';
import VideoPlayer from './containers/VideoPlayer.jsx';
import { PressPage } from './components/PressPage.jsx';
import { ShowsPage } from './components/ShowsPage.jsx';
import { BlogPage } from './components/BlogPage.jsx';
import { fetchAlbum } from './helpers.jsx';

export const HcSiteRoutes = [
  {
    path: '/listen',
    component: AlbumLibrary,
    propsData: {
      fetchAlbum,
    },
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
