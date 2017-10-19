export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_SONGPLAYER_CMD':
      return Object.assign(
        {},
        state,
        { command: action.command },
      );
    case 'SELECT_SONG_FROM_ALBUM':
      return Object.assign(
        {},
        state,
        { selectedSong: action.selectedSong },
      );
    default:
      return state;
  }
};
