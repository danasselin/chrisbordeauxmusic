import * as actions from '../actions';

describe('setSelectedAlbum', () => {
  it('should generate the action for setting a user-selected album', () => {
    const testSongs = { songs: ['song1', 'song2', 'song3'] };
    const expectedAction = {
      type: 'SET_SELECTED_ALBUM',
      songs: testSongs,
    };
    expect(actions.setSelectedAlbum(testSongs)).toEqual(expectedAction);
  })
});

describe('setSongPlayerCmd', () => {
  it('should generate action for setting song player command', () => {
    const testCommand = 'test';
    const expectedAction = {
      type: 'SET_SONGPLAYER_CMD',
      command: testCommand,
    };
    expect(actions.setSongPlayerCmd(testCommand)).toEqual(expectedAction);
  })
});

describe('selectSongFromAlbum', () => {
  it('should generate action for selecting song from album', () => {
    const testSelectedSong = 'test song';
    const expectedAction = {
      type: 'SELECT_SONG_FROM_ALBUM',
      selectedSong: testSelectedSong,
    };
    expect(actions.selectSongFromAlbum(testSelectedSong)).toEqual(expectedAction);
  })
});
