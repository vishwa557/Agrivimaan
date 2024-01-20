import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "../agrivimaan1.png";

function NavBar() {
  const logoStyles = {
    width: '4rem',
    marginLeft: '2rem',
    borderRadius: '0.5rem',
  };

  return (
    <>
      <div className="flex border place-items-center justify-between space-x-3 py-4">
        <div className="flex gap ml-5 font-italic font-bold w-14 ">
          <img src={Image} width="100px" height="auto"  />
        </div>
        <div className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="ml-2 text-green-500" />
          <select className="py-5 px-10 pt-4 pb-4 ml-2 border w-[25rem]">
            <option>Dadar, Mumbai</option>
          </select>
        </div>
        <div className="services">
          <FontAwesomeIcon icon={faSearch} className="ml-2 text-gray-500" />
          <select className="py-5 px-10 pt-4 pb-4 ml-2 border w-[25rem]">
            <option>Drone Types</option>
            <option>Drone spraying services</option>
            <option>Drone repair services</option>
            <option>Drone Operating services</option>
          </select>
        </div>
        <div className="Login ml-auto">
          <a href="#" className="py-5 px-10 pt-4 pb-4 mr-3 border">
            Login
          </a>
        </div>
      </div>
    </>
  );
}

export default NavBar;  



