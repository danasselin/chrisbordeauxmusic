const albumPreviewCarousel = (
  state = {
    offset: 0,
  },
  action,
) => {
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
    case 'SET_PREVIEW_OFFSET':
      return Object.assign(
        {},
        state,
        { offset: action.offset },
      );
    case 'SCROLL_TO_PREVIEW':
      return Object.assign(
        {},
        state,
        { selectedPreviewId: action.selectedPreviewId },
      );
    default:
      return state;
  }
};

export default albumPreviewCarousel;
