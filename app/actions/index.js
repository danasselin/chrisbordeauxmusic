export const setSelectedAlbum = songs => (
  {
    type: 'SET_SELECTED_ALBUM',
    songs,
  }
);

export const setSongPlayerCmd = command => (
  {
    type: 'SET_SONGPLAYER_CMD',
    command,
  }
);

export const selectSongFromAlbum = selectedSong => (
  {
    type: 'SELECT_SONG_FROM_ALBUM',
    selectedSong,
  }
);

export const updateSongTime = time => (
  {
    type: 'UPDATE_SONG_TIME',
    time,
  }
);
