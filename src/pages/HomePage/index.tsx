// index.tsx (HomePage) code:
import { useState } from 'react';
import usePageStartScroll from '../../hooks/usePageStartScroll';
import { usePlaces } from '../../services/getPlaces';
import CategoriesSlider from './components/CategoriesSlider';

export default function HomePage() {
  const [searchQuery] = useState('');
  const [minD, setMinD] = useState('');
  const [maxD, setMaxD] = useState('');

  if (minD.length > 1 && maxD.length > 1) {
    setMinD('');
    setMaxD('');
  }

  usePageStartScroll();

  const { data,
  } = usePlaces({
    query: searchQuery,
    currency: 'USD',
    includeBlogPosts: false,
    pageIndex: 1,
    pageLength: 10,
    startTime: minD,
    endTime: maxD
  });

  return (
    <>
      {/* <!--HERO START--> */}
      <div className="page-container hero-container">
        <div className="page-container--inner">
          <h2 className="hero-h2">
            University Students <br />
            Now you have the chance to travel the world!
          </h2>
          <h1 className="hero-h1">
            Starting from $12
          </h1>

          <div className="hero-datepicker">
            <div className="datepicker">
              <select aria-label="Select location" className="location-select">
                <option value="" selected>Select location</option>
                <option>Barcelona</option>
                <option>Paris</option>
                <option>London</option>
                <option>Budapest</option>
                <option>Rome</option>
                <option>Helsinki</option>
                <option>Athens</option>
                <option>Amsterdam</option>
              </select>
              <button>
                <img src="./images/calendar-icon.png" alt="" />
              </button>
            </div>
            <div className="datepicker">
              <span>
                Select dates
              </span>
              {/* TODO: Remove this with an actual date picker */}
              {/* <input type="date" value={minD} onChange={(e) => setMinD(e.target.value)} /> */}
              {/* TODO: Remove this with an actual date picker */}
              {/* <input type="date" value={maxD} onChange={(e) => setMaxD(e.target.value)} /> */}
              <button>
                <img src="./images/calendar-icon.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!--HERO END--> */}
      {/* <!--MOBILE DATEPICKER START--> */}
      <div className="page-container mobile-datepicker">
        <div className="page-container--inner">
          <div className="datepicker">
            <span>
              Select location
            </span>
            <button>
              <img src="./images/calendar-icon.png" alt="" />
            </button>
          </div>
          <div className="datepicker">
            <span>
              Select dates
            </span>
            <button>
              <img src="./images/calendar-icon.png" alt="" />
            </button>
          </div>
        </div>
      </div>
      {/* <!--MOBILE DATEPICKER END--> */}
      {/* <!--CATEGORIES SLIDER START--> */}
      <div className="page-container categories-slider-container">
        <div className="page-container--inner">
          <CategoriesSlider />
        </div>
      </div>
      {/* <!--CATEGORIES SLIDER  END--> */}
      {/* <!--PRODUCTS GRID START--> */}
      <div className="page-container products-grid">
        <div className="page-container--inner">
          <div className="product-grid-items">
            {data?.[0].isSuccessful && data[0].data.map((place) => (
              <div className="product-grid-item">
                <div className="product-grid-item-image">
                  <img src={place.img} alt="1" />
                </div>
                <div className="product-grid-item-content">
                  <h4 className="title">
                    {place.name}
                  </h4>
                  <span className="subtitle">
                    {place.type}
                  </span>
                  <span className="price">
                    {place.pricePerNight.toString()}
                  </span>
                </div>
              </div>
            ))}
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-1.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Barcelona | 1 + 0
                </h4>
                <span className="subtitle">
                  Studio Room
                </span>
                <span className="price">
                  $32.00
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-2.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Helsinki | 1 + 1
                </h4>
                <span className="subtitle">
                  Standart Room
                </span>
                <span className="price">
                  $32.00
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-1.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Rome | 1 + 0
                </h4>
                <span className="subtitle">
                  Large Studio Room
                </span>
                <span className="price">
                  $43.00
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-4.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Amsterdam | 2 + 1
                </h4>
                <span className="subtitle">
                  Shared Standart Room
                </span>
                <span className="price">
                  $20.00
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-5.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Rome | 1 + 1
                </h4>
                <span className="subtitle">
                  Standart Room
                </span>
                <span className="price">
                  $47.00
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-6.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Paris | 1 +0
                </h4>
                <span className="subtitle">
                  Large Studio Room
                </span>
                <span className="price">
                  $60.00
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-7.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Amsterdam | 1 + 1
                </h4>
                <span className="subtitle">
                  Standart Room
                </span>
                <span className="price">
                  $52.50
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-8.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Winter Time at Budapest
                </h4>
                <span className="subtitle">
                  Activities, Places…
                </span>
                <div className="series-info">
                  WINTER SERIES
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--PRODUCTS GRID END--> */}
      {/* <!--PRODUCTS GRID SECONDARY START--> */}
      <div className="page-container products-grid products-grid-secondary">
        <div className="page-container--inner">
          <div className="product-grid-items">
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-6.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Paris | 1 +0
                </h4>
                <span className="subtitle">
                  Large Studio Room
                </span>
                <span className="price">
                  $60.00
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-7.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Amsterdam | 1 + 1
                </h4>
                <span className="subtitle">
                  Standart Room
                </span>
                <span className="price">
                  $52.50
                </span>
              </div>
            </div>
            <div className="product-grid-item">
              <div className="product-grid-item-image">
                <img src="./images/product-grid-item-8.png" alt="1" />
              </div>
              <div className="product-grid-item-content">
                <h4 className="title">
                  Winter Time at Budapest
                </h4>
                <span className="subtitle">
                  Activities, Places…
                </span>
                <div className="series-info">
                  WINTER SERIES
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--PRODUCTS GRID SECONDARY END--> */}
    </>
  );
}