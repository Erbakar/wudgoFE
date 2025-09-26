// @ts-ignore
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function () {
  return (
    <Splide hasTrack={false} aria-label="My Favorite Images" className="categories-slider" options={{
      perPage: 8,
      type: 'loop',
      rewind: true,
      gap: '24px',
      perMove: 1,
      pagination: false,
      classes: {
        arrows: 'splide__arrows',
        arrow: 'splide__arrow ',
        prev: 'splide__arrow--prev splide__arrow-prev',
        next: 'splide__arrow--next splide__arrow-next',
      },
      breakpoints: {
        1024: {
          perPage: 5,
        },
        992: {
          perPage: 5,
        },
        576: {
          perPage: 3,
        }
      }
    }}>
      <SplideTrack>
        <SplideSlide>
          <div className="icon">
            <img src="./images/categories-slider-1.png" alt="" />
          </div>
          <span className="title">
            Barcelona
          </span>
        </SplideSlide>
        <SplideSlide>
          <div className="icon">
            <img src="./images/categories-slider-2.png" alt="" />
          </div>
          <span className="title">
            Paris
          </span>
        </SplideSlide>
        <SplideSlide>
          <div className="icon">
            <img src="./images/categories-slider-3.png" alt="" />
          </div>
          <span className="title">
            London
          </span>
        </SplideSlide>
        <SplideSlide>
          <div className="icon">
            <img src="./images/categories-slider-4.png" alt="" />
          </div>
          <span className="title">
            Budapest
          </span>
        </SplideSlide>
        <SplideSlide>
          <div className="icon">
            <img src="./images/categories-slider-5.png" alt="" />
          </div>
          <span className="title">
            Rome
          </span>
        </SplideSlide>
        <SplideSlide>
          <div className="icon">
            <img src="./images/categories-slider-6.png" alt="" />
          </div>
          <span className="title">
            Helsinki
          </span>
        </SplideSlide>
        <SplideSlide>
          <div className="icon">
            <img src="./images/categories-slider-7.png" alt="" />
          </div>
          <span className="title">
            Athens
          </span>
        </SplideSlide>
        <SplideSlide>
          <div className="icon">
            <img src="./images/categories-slider-8.png" alt="" />
          </div>
          <span className="title">
            Amsterdam
          </span>
        </SplideSlide>
      </SplideTrack>


      <div className="splide__arrows">
        <button className="splide__arrow splide__arrow--prev" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" transform="matrix(-1 0 0 1 24 0)" fill="var(--color-dark)" />
            <path d="M13.7949 6.68555L8.45192 12.5081L8.54213 12.5371L13.7949 18.4824" stroke="white"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="splide__arrow splide__arrow--next" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="var(--color-dark)" />
            <path d="M10.2051 6.68555L15.5481 12.5081L15.4579 12.5371L10.2051 18.4824" stroke="white"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </Splide>
  );
}