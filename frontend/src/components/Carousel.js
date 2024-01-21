import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://www.agrifarming.in/wp-content/uploads/2022/09/Importance-of-Drones5-1024x683.jpg',
  'https://semantictech.in/blogs/wp-content/uploads/2023/06/History-of-drone-in-agriculture.png',
  'https://st3.depositphotos.com/3258807/13219/i/450/depositphotos_132193318-stock-photo-handsome-man-repairing-drone-with.jpg',
];

const MyCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 50, 
  };

  return (
    <Slider {...settings}>
      {images.map((imageUrl, index) => (
        <div key={index}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              style={{ width: '60%', height: 'auto' }}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default MyCarousel;