export const setSelectedAlbum = album => (
  {
    type: 'SET_SELECTED_ALBUM',
    album,
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

export const browsePreview = direction => (
  {
    type: 'BROWSE_PREVIEW',
    direction,
  }
);

export const setPreviewWidth = width => (
  {
    type: 'SET_PREVIEW_WIDTH',
    width,
  }
);

export const setPreviewOffset = offset => (
  {
    type: 'SET_PREVIEW_OFFSET',
    offset,
  }
);

export const scrollToPreview = selectedPreview => (
  {
    type: 'SCROLL_TO_PREVIEW',
    selectedPreview,
  }
);
