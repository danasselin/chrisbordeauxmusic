import React from 'react';
import { albumTitles } from '../constants';

const PREVIEW_WIDTH = 375;

const AlbumPreview = ({ title }) => (
  <div className='album-preview'>
    {title}
  </div>
);

class AlbumPreviewCarousel extends React.Component {
  constructor() {
    super();
    this.distance = 0;
  }
  slide(direction) {
    const wrapper = document.getElementsByClassName('carousel-wrap');
    if (direction === 'left') {
      this.distance += PREVIEW_WIDTH;
      wrapper[0].style.transform = `translateX(${this.distance}px)`;
    } else {
      this.distance -= PREVIEW_WIDTH;
      wrapper[0].style.transform = `translateX(${this.distance}px)`;
    }
  }

  render() {
    return (
      <div className='album-preview-carousel'>
        <div className='carousel-wrap'>
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

export default AlbumPreviewCarousel;
