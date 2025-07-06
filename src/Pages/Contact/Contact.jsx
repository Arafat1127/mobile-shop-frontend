import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Contact = () => {

  /*  Scrollbar */
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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Form */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Enter subject"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Type your message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-500 text-white p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">&#x1F4CD;</span>
                <span>123 Mobile store, Shankar, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl">&#x260E;</span>
                <span>+880 1601192690</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl">&#x2709;</span>
                <span>support@mobilestore.com</span>
              </div>
            </div>
            <iframe
              className="mt-6 w-full h-40 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.7686442796185!2d90.41251831543247!3d23.810332792076857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a04f72f9d9%3A0x7a5a5d4d2e1e66c5!2sDhaka!5e0!3m2!1sen!2sbd!4v1614070125896!5m2!1sen!2sbd"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
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

export default Contact;
