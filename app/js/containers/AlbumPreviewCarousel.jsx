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
    this.previews = this.processPreviews(this.props.previews);
    this.centerIndex = getCenterIndex(this.previews);
  }

  getNextPreview(selected) {
    const index = this.previews.findIndex(({ data: { id } }) => (
      id === selected
    ));
    return index;
  }

  componentWillReceiveProps({ selectedPreviewId = null }) {
    if (selectedPreviewId) {
      this.slide(null, this.getNextPreview(selectedPreviewId));
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

  processPreviews(previews, center = 'obviousChild') {
    const { previewWidth: width } = this;
    return sortCenter(previews, center).map(data => (
      { data, width }
    ));
  }

  slide(direction, index) {
    console.log('index', index, 'this.centerIndex', this.centerIndex);
    const { offset } = this.props;
    if (direction === 'left') {
      this.props.setPreviewOffset(offset - this.slideDistance);
    } else {
      this.props.setPreviewOffset(offset + this.slideDistance);
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
            onClick={() => this.slide('left')}
            className="fa fa-arrow-left fa-2x"
            aria-hidden="true">
          </i>
          <SongPlayer />
          <i
            onClick={() => this.slide('right')}
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
