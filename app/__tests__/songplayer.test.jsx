import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SongPlayer from '../components/SongPlayer/SongPlayer.jsx';
import Song from '../components/SongPlayer/Song.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('SongPlayer', () => {
  let wrapper;
  const testAlbum = [
    {
      name: 'Test song 1',
      path_lower: 'test/song/1',
    },
  ];

  function testFetch() {
    this.setState({ album: testAlbum });
  }
  beforeEach(() => {
    wrapper = mount(<SongPlayer fetch={ testFetch } />);
  });

  it('Renders an album\'s song titles', () => {
    const {
      props: {
        info: { name, path_lower: path }
      }
    } = wrapper.find(Song).get(0);
    expect(name).toEqual('Test song 1');
    expect(path).toEqual('test/song/1');
  });
});
