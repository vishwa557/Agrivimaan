import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DroneList = () => {
  const [drones, setDrones] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [user_id, setUserID] = useState([]);
  const [drone_id, setDroneID] = useState([])

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/drones/');
        setDrones(response.data);
      } catch (error) {
        console.error('Failed to fetch drones:', error);
        setError('Failed to fetch drones');
      }
    };

    fetchData();
  }, []);

  const addToCart = async (drone) => {
    const newCartItems = [...cartItems, drone];
   
    setCartItems(newCartItems);
      const lastAddedDroneId = newCartItems[newCartItems.length-1].drone_id
      setDroneID(lastAddedDroneId)
    
     // Get user_id from local storage
     const userDetailsString = localStorage.getItem('userDetails');
     const userDetails = JSON.parse(userDetailsString);
      setUserID (userDetails.UserID);
     
  try {
    const response = await axios.post('http://localhost:8000/cart/add', {
      user_id: user_id,
      drone_id: drone_id,
      quantity: 1 // Example quantity, replace with the actual quantity value
    });

    console.log(response.data.message); // Log the message returned from the API
  } catch (error) {
    console.error('Error adding to cart:', error.response.data.error);
  }
};

  const handlePhotoClick = (droneId) => {
    console.log('Photo clicked');
    // You can handle the navigation to the single drone page here
  };

  return (
    <div className='mt-20'>
      {error && <div>Error: {error}</div>}
      <div className="flex flex-row justify-between items-center gap-3 bg-zinc-100 mb-4 h-24">
        <div className="flex">
          <Link to="/drones" className="mr-4">Drones</Link>
          <Link to="/drone-spare-parts">Drone Spare Parts</Link>
        </div>
        <div className="flex items-center">
          <input type="text" placeholder="Search..." className="border border-gray-300 px-2 py-1 rounded-l-md" />
          <button className="bg-gray-200 px-2 py-1 rounded-r-md">
            <i className="fas fa-search"></i>
          </button>
          <select className="border border-gray-300 ml-2 px-2 py-1 rounded-md">
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="ml-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {drones.map((drone) => (
          <div key={drone.drone_id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-1000 flex flex-col relative">
            <div className="aspect-w-16 aspect-h-9" onClick={() => handlePhotoClick(drone.drone_id)}>
              <img src={drone.Drone_img} alt={drone.drone_name} className="w-full h-full object-cover object-center" style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{drone.drone_name}</h2>
              <p className="text-gray-700 mb-2">{drone.drone_model}</p>
              <p className="text-gray-700 mb-2">Price: ${drone.Price}</p>
            </div>
            <div className="flex justify-center mt-auto sticky bottom-4 bg-white">
              <button onClick={() => addToCart(drone)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Add To Cart</button>

            </div>
          </div>
        ))}
      </div>
      
    </div>
    
  );
  
};

export default DroneList;
