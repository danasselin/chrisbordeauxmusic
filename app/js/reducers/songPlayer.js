export default (
  state = {
    command: 'queued',
    songTime: '0:00',
  },
  action,
) => {
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
        {
          selectedSong: action.selectedSong,
        },
      );
    case 'UPDATE_SONG_TIME':
      return Object.assign(
        {},
        state,
        {
          songTime: action.time,
        },
      );
    default:
      return state;
  }
};
