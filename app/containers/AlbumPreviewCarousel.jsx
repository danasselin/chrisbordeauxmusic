import React from 'react';
import { connect } from 'react-redux';
import { browsePreview, setPreviewWidth, setPreviewDistance } from '../actions';
import { sortCenter } from '../helpers.jsx';

const AlbumPreview = ({ title, width }) => (
  <div className='album-preview' style={{ minWidth: `${width}px` }}>
    { title }
  </div>
);

class AlbumPreviewCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.previewWidth = this.getPreviewWidth();
    this.previews = this.processPreviews(this.props.previews);
  }

  componentWillMount() {
    // this.props.setPreviewWidth(this.previewWidth);
    this.center = this.getCenter();
  }

  componentDidMount() {
    this.props.setPreviewDistance(this.getDistance());
  }

  getPreviewWidth() {
    // get window width
    // if mobile threshold return mobile width
    // if tablet threshold return tablet width
    // if desktop threshold return desktop width
    return 350;
  }

  getCenter() {
    const windowWidth = window.outerWidth;
    const windowCenter = windowWidth / 2;
    const previewCenter = this.previewWidth / 2;
    return windowCenter - previewCenter;
  }

  getDistance() {
    // return (offsetLeft of center + 1) - (center offsetLeft)
    const previews = document.querySelectorAll('.album-preview');
    const previewLength = previews.length;
    const centerIndex = Math.round(previewLength / 2);
    const center = previews[centerIndex];
    return previews[centerIndex + 1].offsetLeft - center.offsetLeft;
  }

  processPreviews(previews, center = 'A Hundred Thousand Dollars A Day (Single)') {
    const { previewWidth: width } = this;
    return sortCenter(previews, center).map(title => (
      { title, width }
    ));
  }

  slide(direction) {
    const { distance } = this.props;
    this.slideDistance = this.slideDistance || distance;
    if (direction === 'left') {
      this.props.setPreviewDistance(distance - this.slideDistance);
    } else {
      this.props.setPreviewDistance(distance + this.slideDistance);
    }
  }

  render() {
    const wrapStyle = {
      transform: `translateX(${this.props.distance}px)`,
      left: `${this.center}px`,
    };
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
  albumPreviewCarousel: { distance, scroll, previewWidth },
}) => ({ distance, scroll, previewWidth });

const mapDispatchToProps = {
  btnOnClick: browsePreview,
  setPreviewDistance,
  setPreviewWidth,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPreviewCarousel);
