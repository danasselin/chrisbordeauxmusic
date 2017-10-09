import React from 'react';
import SongPlayer from './SongPlayer/SongPlayer.jsx';
import { fossilFuelKid } from '../dummyData';

class App extends React.Component {
  render() { // eslint-disable-line class-methods-use-this
    return (
      <div className="content">
        <header className="banner">
          <h1>Hayride Casualties</h1>
        </header>
        <nav className="hc-nav">
          <ul>
            <li>Listen</li>
            <li>Video</li>
            <li>Press</li>
            <li>Shows</li>
            <li>Blog</li>
          </ul>
        </nav>
        <main className="hc-hero"></main>
        <SongPlayer album={ fossilFuelKid }/>
      </div>
    );
  }
}

export default App;
