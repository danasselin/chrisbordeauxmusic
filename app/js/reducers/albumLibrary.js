const albumLibrary = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ALBUM':
      return {
        album: action.album,
      };
    default:
      return state;
  }
};

export default albumLibrary;
