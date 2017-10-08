import React from 'react';
import SongPlayer from './SongPlayer/SongPlayer.jsx'; // eslint-disable-line no-unused-vars
import { fossilFuelKid } from '../dummyData';

class App extends React.Component {
  render() { // eslint-disable-line class-methods-use-this
    return (
      <div className="content">
        <header className="banner">
          <h1>Hayride Casualties</h1>
        </header>
        <SongPlayer album={ fossilFuelKid }/>
      </div>
    );
  }
}

export default App;
