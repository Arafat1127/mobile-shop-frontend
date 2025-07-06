import React, { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider/ImageSlider';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

import ProductCard from './Products/ProductCard';
import AllCategories from './Category/AllCategories';
import { Link } from 'react-router-dom';

import Blog from '../Blog/Blog';
import About from '../About/About';




const Home = () => {
          const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    
        return (

                
                <div>
                     <div>
                         <ImageSlider></ImageSlider>
                     </div>

                    <div>
                         <ProductCard></ProductCard>
                    </div>

            <div className="bg-gray-50">
      {/* Hero Section */}
      <div className=" bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-10">
        <h1 className="text-4xl font-bold">Find Your Perfect Mobile</h1>
        <p className="mt-4 text-lg">Browse the latest models at unbeatable prices.</p>
      <Link to="/mobile" >
        <button className="mt-6 px-6 py-3 bg-white text-primary rounded-lg shadow-md hover:bg-secondary font-bold">
              Shop Now      
        </button>
      </Link>
      </div>     
      {/* Featured Products */}
      <div className="py-5  ">
        <h2 className="text-3xl font-bold text-center my-10">Trending Now</h2>   
            <AllCategories></AllCategories>   
      </div>

       {/* Product Categories */}
      <section className="py-10 px-8">
        <h2 className="text-2xl font-bold text-center mb-8">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
            <Link to="/mobile" >
            <div
              className="p-6 bg-white rounded-xl shadow-md text-center hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold">SmartPhones</h3>
            </div>
            </Link>
            <Link to="/laptop" >
            <div
              className="p-6 bg-white rounded-xl shadow-md text-center hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold">Laptop</h3>
            </div>
            </Link>
           <Link to="/tv" >
            <div
              className="p-6 bg-white rounded-xl shadow-md text-center hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold">Tv</h3>
            </div>
            </Link>
     
        </div>
      </section>
    <div>
      <About></About>
    </div>
      <div>
        <Blog></Blog>
      </div>
      
       
    </div>




      <div>
                {/* Scroll to top button */}
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className="flex justify-center items-center fixed bottom-12 right-12 p-3 h-[55px] object-cover w-[55px] bg-gray-300 font-bold hover:text-white  rounded-full shadow-lg hover:bg-black transition-all"
                    >
                        <FontAwesomeIcon className='w-9 h-5 font-bold' icon={faAngleUp} />
                    </button>
                )}
            </div>
                </div>
        );
};

export default Home;