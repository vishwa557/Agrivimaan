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
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 1500, 
  };

  return (
    <Slider {...settings}>
      {images.map((imageUrl, index) => (
        <div key={index}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'10px' }}>
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              style={{ width: '60%', height: '50%' }}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default MyCarousel;

// import React from 'react';
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'

// function MyCarousel(props)
// {
//     var items = [
//         {
//             name: "Random Name #1",
//             description: "Probably the most random thing you have ever seen!"
//         },
//         {
//             name: "Random Name #2",
//             description: "Hello World!"
//         }
//     ]

//     return (
//         <Carousel>
//             {
//                 items.map( (item, i) => <Item key={i} item={item} /> )
//             }
//         </Carousel>
//     )
// }

// function Item(props)
// {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }
//  export default MyCarousel;