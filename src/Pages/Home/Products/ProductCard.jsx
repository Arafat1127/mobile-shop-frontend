import React from "react";
import phone from "../../../assets/watch/Blue.png"
import Laptop from "../../../assets/watch/laptop.png"
import Tv from "../../../assets/watch/sony.png"
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
   <div>
    <h2 className="text-3xl font-bold text-center my-10">Our Categories</h2>
     <div  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    <Link to="/mobile">
      <div
      className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden mb-6"
  
    >
      <img
        src={phone}
        alt=""
        className="w-full h-48 object-contain mb-4 transition duration-300 transform hover:scale-110"
      />
      <div className="text-center">
        <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">
        Mobile
         
        </h2>
      </div>
    </div>
    </Link>
    <Link to='/laptop' >
     <div
      className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden mb-6"
     
    >
      <img
        src={Laptop}
        alt=""
        className="w-full h-48 object-contain mb-4 transition duration-300 transform hover:scale-110"
      />
      <div className="text-center">
        <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">
        Laptop
          
        </h2>
      </div>
    </div>
    </Link>
     
      <Link to="/tv" >
      <div
      className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden mb-6"
      
    >
      <img
        src={Tv}
        alt=""
        className="w-full h-48 object-contain mb-4 transition duration-300 transform hover:scale-110"
      />
      <div className="text-center">
        <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">
        
          Tv
        </h2>
      </div>
    </div>
      </Link>
    </div>
   </div>
  );
};

export default ProductCard;
