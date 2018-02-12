const scores = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_SCORE':
      return { score: action.score };
    default:
      return state;
  }
};

export default scores;
