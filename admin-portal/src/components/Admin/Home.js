import React,{useState} from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPerson,BsInfoCircle,BsPlusCircle, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home({orderCount,usersCount,pilotsCount,repaireRequestCount,sprayingRequestCount}) {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const navigate = useNavigate();
    console.log(orderCount,usersCount,repaireRequestCount,pilotsCount,sprayingRequestCount)
  const handleOrders = ()=>{
     navigate('/orders')
  }
  const handleCustomers = ()=>{
    navigate('/customers')
 }
 const handleRequestsInProgress = ()=>{
    navigate('/repair-request')
 }
 const handleRequestsInQueue = ()=>{
    navigate('/spraying-request')
 }
 const handleCrateAPilot = ()=>{
    navigate('/pilot-creation')
 }
 const handlePilots = ()=>{
    navigate('/pilots')
 }
  return (
    <>
     <main className='main-container overflow-y-auto p-20 text-white mt-20'>
    <div className='main-cards grid grid-cols-4 gap-20 my-15'>
        <div className='card bg-blue-500 rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleOrders}>
            <div className='card-inner flex items-center justify-between'>
                <h3>ORDERS</h3>
                <BsFillArchiveFill className='card_icon text-white text-lg' />
            </div>
            <h1>{orderCount}</h1>
        </div>
        <div className='card bg-green-700 rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleCustomers}>
            <div className='card-inner flex items-center justify-between'>
                <h3>CUSTOMERS</h3>
                <BsPeopleFill className='card_icon text-white text-lg' />
            </div>
            <h1>{usersCount}</h1>
        </div>
        <div className='card bg-orange-500 rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleRequestsInProgress}>
            <div className='card-inner flex items-center justify-between'>
                <h3>REPAIR REQUESTS </h3>
                <BsInfoCircle className='card_icon text-white text-lg' />
            </div>
            <h1>{repaireRequestCount}</h1>
        </div>
        <div className='card bg-red-700 rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleRequestsInQueue}>
            <div className='card-inner flex items-center justify-between'>
                <h3>SPRAYING REQUESTS</h3>
                <BsInfoCircle className='card_icon text-white text-lg' />
            </div>
            <h1>{sprayingRequestCount}</h1>
        </div>
        <div className='card bg-black rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleCrateAPilot}>
            <div className='card-inner flex items-center justify-between'>
                <h3>CREATE A PILOT</h3>
                <BsPlusCircle className='card_icon text-white text-lg' />
            </div>
        </div>
        <div className='card bg-black rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handlePilots}>
            <div className='card-inner flex items-center justify-between'>
                <h3>PILOTS</h3>
                <BsPerson className='card_icon text-white text-lg' />
            </div>
            <h1>{pilotsCount}</h1>
        </div>
    </div>
   </main>
   </>
  )
}

export default Home