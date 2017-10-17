export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ALBUM':
      return { songs: action.songs };
    default:
      return state;
  }
};
