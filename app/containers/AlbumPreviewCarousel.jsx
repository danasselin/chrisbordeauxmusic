import React from 'react';
import { connect } from 'react-redux';
import { browsePreview, setPreviewWidth, setPreviewDistance } from '../actions';
import { albumTitles } from '../constants';

const PREVIEW_WIDTH = 375;

const AlbumPreview = ({ title }) => (
  <div className='album-preview'>
    {title}
  </div>
);

class AlbumPreviewCarousel extends React.Component {
  componentWillMount() {
    this.props.setPreviewWidth(PREVIEW_WIDTH);
  }

  slide(direction) {
    const { distance, previewWidth } = this.props;
    if (direction === 'left') {
      this.props.setPreviewDistance(distance + previewWidth);
    } else {
      this.props.setPreviewDistance(distance - previewWidth);
    }
  }

  render() {
    const wrapStyle = { transform: `translateX(${this.props.distance}px)` };
    return (
      <div className='album-preview-carousel'>
        <div className='carousel-wrap' style={wrapStyle}>
          {
            albumTitles.map((title, i) => (
              <AlbumPreview
                key={ i }
                title={ title }
              />
            ))
          }
        </div>
        <div className='carousel-btn-wrap'>
          <p onClick={() => this.slide('right')}>
            RIGHT
          </p>
          <p onClick={() => this.slide('left')}>
            LEFT
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
