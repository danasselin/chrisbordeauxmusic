// skipping test file but leaving it in codebase to reference
// working Jest and Enzyme configurations
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SongPlayer from '../containers/SongPlayer.jsx';

Enzyme.configure({ adapter: new Adapter() });
describe.skip('SongPlayer', () => {
  let wrapper;

  function testFetch() {
    this.setState({ album: testAlbum });
  }
  beforeEach(() => {
    wrapper = mount(<SongPlayer fetch={ testFetch } />);
  });

  xit('Renders an album\'s song titles', () => {
    const {
      props: {
        info: { name, path_lower: path }
      }
    } = wrapper.find(Song).get(0);
    expect(name).toEqual('Test song 1');
    expect(path).toEqual('test/song/1');
  });
});
