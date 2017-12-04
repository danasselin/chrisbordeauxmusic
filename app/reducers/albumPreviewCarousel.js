const albumPreviewCarousel = (state = { distance: 0 }, action) => {
  switch (action.type) {
    case 'BROWSE_PREVIEW':
      return Object.assign(
        {},
        state,
        { scroll: action.scroll },
      );
    case 'SET_PREVIEW_WIDTH':
      return Object.assign(
        {},
        state,
        { previewWidth: action.width },
      );
    case 'SET_PREVIEW_DISTANCE':
      return Object.assign(
        {},
        state,
        { distance: action.distance },
      );
    default:
      return state;
  }
};

export default albumPreviewCarousel;
