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
