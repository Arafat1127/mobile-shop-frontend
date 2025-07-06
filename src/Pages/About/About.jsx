import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
        return (
              
               <div className="p-4 space-y-8">
                    {/* Special Deals/Offers Section */}
                    <section className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-8 px-6 rounded-xl shadow-lg">
                      <h2 className="text-2xl font-bold mb-4">Special Deals</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Example Deal Card */}
                        {Array(3).fill().map((_, index) => (
                          <div key={index} className="bg-white text-gray-800 rounded-lg shadow-md p-4">
                          
                            <p className="mt-2">Get 20% off on the latest smartphones!</p>
                            <Link to="/all-categories">
                            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Shop Now</button></Link>
                          </div>
                        ))}
                      </div>
                    </section>
              
                    {/* About Us Section */}
                    <section className="bg-gray-100 py-8 px-6 rounded-xl shadow-lg">
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">About Us</h2>
                      <p className="text-gray-600">Welcome to our mobile shop! We offer the latest and most affordable smartphones and accessories. Our mission is to bring cutting-edge technology to everyone.</p>
                      <img 
                        src="https://mobilebuzzbd.com/wp-content/uploads/2025/05/Untitled-2.jpg" 
                        alt="About us" 
                        className="mt-4 rounded-lg shadow-md"
                      />
                    </section>
              
                
                  </div>
              
        );
};

export default About;
