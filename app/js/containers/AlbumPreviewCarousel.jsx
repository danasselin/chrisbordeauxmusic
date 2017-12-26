import React from 'react';
import { connect } from 'react-redux';
import { browsePreview, setPreviewWidth, setPreviewOffset } from '../actions';
import { sortCenter } from '../helpers.jsx';

const AlbumPreview = ({ title, width, addlClass = '' }) => (
  <div
    className={`album-preview ${addlClass}`}
    style={{ minWidth: `${width}px` }}>
    { title }
  </div>
);

class AlbumPreviewCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.previewWidth = this.getPreviewWidth();
    this.previews = this.processPreviews(this.props.previews);
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

  processPreviews(previews, center = 'Fossil Fuel Kid') {
    const { previewWidth: width } = this;
    return sortCenter(previews, center).map(title => (
      { title, width }
    ));
  }

  slide(direction) {
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
      <div className='album-preview-carousel'>
        <div className='carousel-wrap' style={wrapStyle}>
          {
            this.previews.map((preview, i) => (
              <AlbumPreview
                key={ i }
                title={ preview.title }
                width={ preview.width }
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
          <p onClick={() => this.slide('left')}>
            LEFT
          </p>
          <p onClick={() => this.slide('right')}>
            RIGHT
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  albumPreviewCarousel: { offset, scroll, previewWidth },
}) => ({ offset, scroll, previewWidth });

const mapDispatchToProps = {
  btnOnClick: browsePreview,
  setPreviewOffset,
  setPreviewWidth,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPreviewCarousel);
