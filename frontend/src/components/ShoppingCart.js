import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        // Get user_id from local storage
        const userDetailsString = localStorage.getItem('userDetails');
      const userDetails = JSON.parse(userDetailsString);
      const user_id = userDetails.UserID;

        // Make API call to fetch cart details for the user
        const response = await axios.get(`http://localhost:8000/cart/${user_id}`);
        const cartData = response.data;
        // console.log(cartData)
        // Fetch drone details for each item in the cart
        const updatedCartItems = await Promise.all(
          cartData.map(async (cartItem) => {
            const droneResponse = await axios.get(`http://localhost:8000/drones/${cartItem.drone_id}`);
            const droneData = droneResponse.data;
            return { ...cartItem, droneDetails: droneData };
          })
        );

        // Set the updated cart items with drone details
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };

    fetchCartDetails();
  }, []);

  const handleBuyNow =()=>{
     navigate('/address')
  }

  return (
    <div className="shopping-cart mt-20">
      <h2>Shopping Cart</h2>
      <div className="ml-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cartItems.map((cartItem) => (
          <div key={cartItem.CartID} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-1000 flex flex-col relative">
            <img src={cartItem.droneDetails.Drone_img} alt={cartItem.droneDetails.drone_name} className='w-full h-full object-cover object-center'/>
            <div className="p-4 flex-grow">
              <h3>{cartItem.droneDetails.drone_name}</h3>
              <p>Price: ${cartItem.droneDetails.Price}</p>
              <p>Quantity: {cartItem.quantity}</p>
              <p>Total Price: ${cartItem.quantity * cartItem.droneDetails.Price}</p>
              {/* You can add additional details here */}
            </div>
            <div className="flex justify-center mt-auto sticky bottom-4 bg-white">
              <button onClick={() => handleBuyNow()} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Buy Now</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
