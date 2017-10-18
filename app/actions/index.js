export const setSelectedAlbum = songs => (
  {
    type: 'SET_SELECTED_ALBUM',
    songs,
  }
);

export const setSongPlayerCmd = songPlayer => (
  {
    type: 'SET_SONGPLAYER_CMD',
    songPlayer,
  }
);
