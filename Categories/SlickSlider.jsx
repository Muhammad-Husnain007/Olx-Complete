import React from 'react';
import './Slider.css';
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from './SliderAssests/sliderimg1.webp';
import img2 from './SliderAssests/sliderimg2.webp';
import img3 from './SliderAssests/sliderimg3.webp';
import arrowImage from './CardsAssests/arrowImage.svg';

const SlickSlider = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
  };

  const images = [img1, img2, img3, img1];

  return (
    <div className='slickSlider'>
      <div className='categories'>
        <ul>
          <li><Link to="/" style={{position: 'relative', top: -4}}>All Categories</Link><img style={{width: 25, height: 20, marginLeft: 5, position: 'relative', top: 2}} src={arrowImage} alt="" /></li>
          <li><Link to="/mobilePhones">Mobile Phones</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/bikes_motorcycle">Motorcycles</Link></li>
          <li><Link to="/houses">Houses</Link></li>
          <li><Link to="/tv_video_audio">Video-Audios</Link></li>
          <li><Link to="/tablets">Tablets</Link></li>
          <li><Link to="/lands_plots">Land & Plots</Link></li>
          {/* Add more Link components for other categories */}
        </ul>
      </div>

      <div className="image-slider">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlickSlider;
