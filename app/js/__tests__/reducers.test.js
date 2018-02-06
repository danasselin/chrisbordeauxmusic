import albumLibrary from '../reducers/albumLibrary';
import songPlayer from '../reducers/songPlayer';

describe('albumLibrary reducer', () => {
  let initialState = {};
  // todo: write this test!
  it('should return the initial state', () => {
    expect(true).toEqual(true);
  });

  it('should handle SET_SELECTED_ALBUM', () => {
    const testAction = {
      type: 'SET_SELECTED_ALBUM',
      songs: ['song 1', 'song 2', 'song 3'],
    };
    const testResultingState = { songs: testAction.songs };
    expect(albumLibrary(initialState, testAction)).toEqual(testResultingState);
  });
});

describe('songPlayer reducer', () => {
  xit('should handle SET_SONGPLAYER_CMD', () => {
    const testAction = {
      type: 'SET_SONGPLAYER_CMD',
      command: 'test command',
    };
    const testResultingState = { command: 'test command' };
    expect(songPlayer({}, testAction)).toEqual(testResultingState);
  });

  xit('should handle SELECT_SONG_FROM_ALBUM', () => {
    const testPrevState = { command: 'test command' };
    const testAction = {
      type: 'SELECT_SONG_FROM_ALBUM',
      selectedSong: 'test selectedSong',
    };
    const testResultingState = {
      command: 'queued',
      selectedSong: 'test selectedSong',
    };
    expect(songPlayer(testPrevState, testAction)).toEqual(testResultingState);
  });
});
