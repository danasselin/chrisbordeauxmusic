import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SongPlayer from './SongPlayer/SongPlayer.jsx';
import VideoPlayer from './VideoPlayer/VideoPlayer.jsx';
import { PressPage } from './PressPage.jsx';
import { ShowsPage } from './ShowsPage.jsx';
import { BlogPage } from './BlogPage.jsx';
import { fossilFuelKid } from '../dummyData';

class App extends React.Component {
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Router>
        <div className="content">
          <header className="banner">
            <h1>Hayride Casualties</h1>
          </header>
          <nav className="hc-nav">
            <ul>
              <Link to={'/listen'}>
                <li>Listen</li>
              </Link>
              <Link to={'/video'}>
                <li>Video</li>
              </Link>
              <Link to={'/press'}>
                <li>Press</li>
              </Link>
              <Link to={'/shows'}>
                <li>Shows</li>
              </Link>
              <Link to={'/blog'}>
                <li>Blog</li>
              </Link>
            </ul>
          </nav>
          <main className="hc-hero"></main>

          <Route
            path='/video'
            render={ () => <VideoPlayer /> }
          />

          <Route
            path='/listen'
            render={ () => <SongPlayer album={ fossilFuelKid }/> }
          />

          <Route
            path='/press'
            render={ () => <PressPage /> }
          />

          <Route
            path='/shows'
            render={ () => <ShowsPage /> }
          />

          <Route
            path='/blog'
            render={ () => <BlogPage /> }
          />

        </div>
      </Router>
    );
  }
}

export default App;
