import React from 'react';
import { connect } from 'react-redux';
import SongPlayer from '~/app/js/containers/SongPlayer.jsx';
import {
  browsePreview,
  setPreviewWidth,
  setPreviewOffset,
  scrollToPreview,
} from '../actions';
import { sortCenter, getCenterIndex } from '../helpers.jsx';

const AlbumPreview = ({ img, width, addlClass = '' }) => (
  <div
    className={`album-preview ${addlClass}`}
    style={{ minWidth: `${width}px` }}>
    <img src={`${img}`} />
  </div>
);

class AlbumPreviewCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.previewWidth = this.getPreviewWidth();
    this.previews = this.processPreviews(this.props.scores);
    this.centerIndex = getCenterIndex(this.previews.length) - 1;
  }

  getNextPreview(selected, direction) {
    let nextPreview;
    let nextIndex;
    if (direction === 'left') {
      nextIndex = selected.index + 1;
      nextPreview = this.previews[nextIndex];
    } else {
      nextIndex = selected.index - 1;
      nextPreview = this.previews[nextIndex];
    }
    if (nextPreview) {
      return {
        preview: nextPreview,
        index: nextIndex,
        direction,
      };
    }
    return selected;
  }

  componentWillReceiveProps({ selectedPreview: nextPreview }) {
    if (this.props.selectedPreview) {
      const { index: currentIndex } = this.props.selectedPreview;
      if (nextPreview.index !== currentIndex) {
        if (!nextPreview.direction) {
          const direction = nextPreview.index > currentIndex ? 'left' : 'right';
          this.slide(
            { ...nextPreview, direction },
            this.getPreviewDiff(nextPreview.index),
          );
        } else {
          this.slide(nextPreview, this.getPreviewDiff(nextPreview.index));
        }
      }
    }
  }

  componentWillMount() {
    const initialState = {
      preview: this.previews[0].data,
      index: 0,
      direction: 'left',
    };
    this.props.scrollToPreview(initialState);
  }

  componentDidMount() {
    this.props.setPreviewOffset(0);
    this.slideDistance = this.getDistance();
  }

  getPreviewWidth() {
    // get window width
    // if mobile threshold return mobile width
    // if tablet threshold return tablet width
    // if desktop threshold return desktop width
    return 350;
  }

  getDistance() {
    const previews = document.querySelectorAll('.album-preview');
    const previewLength = previews.length;
    const centerIndex = Math.round(previewLength / 2);
    const center = previews[centerIndex];
    if (!previews[centerIndex + 1]) {
      return previews[centerIndex].offsetLeft - previews[centerIndex - 1].offsetLeft;
    }
    return previews[centerIndex + 1].offsetLeft - center.offsetLeft;
  }

  processPreviews(previews, center) {
    const { previewWidth: width } = this;
    if (center) {
      return sortCenter(previews, center).map(data => (
        { data, width }
      ));
    }
    return previews.map(data => ({ data, width }));
  }

  getPreviewDiff(selectedIndex) {
    const { index: previousIndex } = this.props.selectedPreview;
    if (selectedIndex > previousIndex) {
      return selectedIndex - previousIndex;
    } else if (selectedIndex < previousIndex) {
      return previousIndex - selectedIndex;
    }
    return 1;
  }

  slide(nextPreview, diff) {
    console.log('slide', nextPreview);
    const direction = nextPreview.direction;
    const { offset } = this.props;
    const slideDistance = this.slideDistance * diff;
    if (direction === 'left') {
      this.props.setPreviewOffset(offset - slideDistance);
    } else {
      this.props.setPreviewOffset(offset + slideDistance);
    }
  }

  render() {
    const wrapStyle = { transform: `translateX(${this.props.offset}px)` };
    return (
      <div className='album-preview-carousel card padded'>
        <div className='carousel-wrap' style={wrapStyle}>
          {
            this.previews.map(({ data, width }, i) => (
              <AlbumPreview
                key={ i }
                img={ data.img }
                width={ width }
              />
            ))
          }
          {
            this.previews.length % 2 === 0
              ?
              <AlbumPreview
                width={ this.previewWidth }
                title={''}
                addlClass='invisible'
              />
              : null
          }
        </div>
        <div className='carousel-btn-wrap'>
          <i
            onClick={() => {
              const nextPreview = this.getNextPreview(this.props.selectedPreview, 'left');
              this.props.scrollToPreview(nextPreview);
            }}
            className="fa fa-arrow-left fa-2x"
            aria-hidden="true">
          </i>
          <SongPlayer />
          <i
            onClick={() => {
              const nextPreview = this.getNextPreview(this.props.selectedPreview, 'right');
              this.props.scrollToPreview(nextPreview);
            }}
            className="fa fa-arrow-right fa-2x"
            aria-hidden="true">
          </i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  albumPreviewCarousel: {
    offset,
    scroll,
    previewWidth,
    selectedPreview,
  },
}) => ({
  offset,
  scroll,
  previewWidth,
  selectedPreview,
});

const mapDispatchToProps = {
  btnOnClick: browsePreview,
  setPreviewOffset,
  setPreviewWidth,
  scrollToPreview,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPreviewCarousel);
