import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SongPlayer from './SongPlayer/SongPlayer.jsx';
import VideoPlayer from './VideoPlayer/VideoPlayer.jsx';
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
              <li>Listen</li>
              <Link to={'/video'}>
                <li>Video</li>
              </Link>
              <li>Press</li>
              <li>Shows</li>
              <li>Blog</li>
            </ul>
          </nav>
          <main className="hc-hero"></main>
          <SongPlayer album={ fossilFuelKid }/>
        </div>
      </Router>
    );
  }
}

export default App;
