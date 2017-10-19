export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_SONGPLAYER_CMD':
      return { command: action.command };
    default:
      return state;
  }
};
