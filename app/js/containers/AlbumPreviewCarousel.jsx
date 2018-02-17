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

  getNextPreview(selected) {
    const index = this.previews.findIndex(({ data: { id } }) => (
      id === selected
    ));
    return index;
  }

  componentWillReceiveProps({ selectedPreviewId = null }) {
    if (selectedPreviewId && selectedPreviewId !== this.props.selectedPreviewId) {
      const index = this.getNextPreview(selectedPreviewId);
      const diff = index - this.centerIndex;
      const direction = (function () {
        if (diff <= -1) {
          return 'right';
        } else if (diff > 0) {
          return 'left';
        }
        return null;
      }());
      if (direction) {
        this.slide(null, direction, Math.abs(diff));
      }
    }
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

  slide(index, direction, centerDiff = 1) {
    if (index < this.previews.length && index >= 0) {
      const { offset } = this.props;
      const slideDistance = this.slideDistance * centerDiff;
      if (direction === 'left') {
        this.centerIndex += centerDiff;
        this.props.setPreviewOffset(offset - (slideDistance));
      } else {
        this.centerIndex -= centerDiff;
        this.props.setPreviewOffset(offset + (slideDistance));
      }
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
            onClick={() => this.slide(this.centerIndex + 1, 'left')}
            className="fa fa-arrow-left fa-2x"
            aria-hidden="true">
          </i>
          <SongPlayer />
          <i
            onClick={() => this.slide(this.centerIndex - 1, 'right')}
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
    selectedPreviewId,
  },
}) => ({
  offset,
  scroll,
  previewWidth,
  selectedPreviewId,
});

const mapDispatchToProps = {
  btnOnClick: browsePreview,
  setPreviewOffset,
  setPreviewWidth,
  scrollToPreview,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPreviewCarousel);
