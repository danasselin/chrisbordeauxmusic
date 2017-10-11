import SongPlayer from './components/SongPlayer/SongPlayer.jsx';
import VideoPlayer from './components/VideoPlayer/VideoPlayer.jsx';
import { PressPage } from './components/PressPage.jsx';
import { ShowsPage } from './components/ShowsPage.jsx';
import { BlogPage } from './components/BlogPage.jsx';

const Dropbox = require('dropbox');

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

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
