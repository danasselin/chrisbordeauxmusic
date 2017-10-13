import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SongPlayer from '../components/SongPlayer/SongPlayer.jsx';
import Song from '../components/SongPlayer/Song.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Song', () => {
  let wrapper;
  const testSongData = {
      name: 'Test song 1',
      path_lower: 'test/song/1',
  };
  function testFetch() {
    this.setState({ link: 'http://test-music-api.com/song-1' })
  }

  beforeEach(() => {
    wrapper = mount(
      <Song
        info={ testSongData }
        fetch={ testFetch }
      />
    );
  });

  it('Attaches streaming link URL to an audio element on click', () => {
    wrapper.find('p').simulate('click');
    const audio = wrapper.find('audio');
    expect(audio.exists()).toBe(true);
    expect(audio.prop('src')).toEqual('http://test-music-api.com/song-1');
  });

});
