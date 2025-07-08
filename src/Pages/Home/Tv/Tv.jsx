import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CartContextApi } from "../../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../Context/AuthProvider";
import { Link } from "react-router-dom";

const Tv = () => {
  const { handleAddToCart } = useContext(CartContextApi);
  const { user } = useContext(AuthContext);
  const [selectedTv, setSelectedTv] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ phoneNumber: "" });

  const { data: tvs = [], isLoading, isError } = useQuery({
    queryKey: ["tvs"],
    queryFn: async () => {
      const res = await fetch("https://mobile-shop-silk.vercel.app/tv");
      if (!res.ok) {
        throw new Error("Failed to fetch TVs");
      }
      return res.json();
    },
  });

  const handleViewDetails = (tv) => setSelectedTv(tv);
  const handleBackToList = () => setSelectedTv(null);
  const handleBooking = () => {
    toast.success("Booking successfully completed!");
    setShowModal(false);
    handleAddToCart(selectedTv);
  };
  const handleInputChange = (e) =>
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });

  // Scroll button logic
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(window.pageYOffset > 100);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C4.477 0 0 4.477 0 12h4zm2 5.291A7.97 7.97 0 014 12H0c0 3.161 1.035 6.078 2.766 8.435l3.234-3.144z"
            ></path>
          </svg>
          <p className="mt-2 text-lg font-semibold text-gray-700">
            Loading TVs, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load TVs from server.");
    return (
      <div className="text-center mt-20 text-red-500 font-semibold text-xl">
        Failed to load TVs. Please try again later.
      </div>
    );
  }

  return (
    <div className="mt-[100px] md:mt-[140px] mb-[50px] flex justify-center">
      <ToastContainer />

      {selectedTv ? (
        <div className="w-full max-w-2xl bg-base-100 shadow-xl p-5">
          <img src={selectedTv.img} alt={selectedTv.name} className="rounded-lg mb-5" />
          <h2 className="text-2xl font-bold mb-2">{selectedTv.name}</h2>
          <h2 className="text-2xl font-semibold mb-3">Category: {selectedTv.category}</h2>
          <p className="mb-2 font-semibold">Details: {selectedTv.details}</p>
          <p className="mb-2 font-semibold">Seller: {selectedTv.sellerName}</p>
          <p className="mb-2 font-semibold">Location: {selectedTv.location}</p>
          <p className="mb-2 font-semibold">Years of Use: {selectedTv.yearsOfUse} Years</p>
          <p className="mb-2 font-semibold">
            Original Price: <span className="line-through">{selectedTv.originalPrice} TK</span>
          </p>
          <p className="mb-4 text-primary font-bold">Resell Price: {selectedTv.resellPrice} TK</p>
          <div className="flex gap-4">
            <button onClick={() => setShowModal(true)} className="btn bg-black text-white hover:bg-red-500">Book Now</button>
            <button onClick={handleBackToList} className="btn bg-gray-300 hover:bg-gray-400">Back to List</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tvs.map((tv) => (
            <div key={tv.id} className="rounded-md bg-base-100 hover:shadow-2xl group relative md:w-[200px] xl:h-[450px] xl:w-[300px]">
              <figure>
                <div className="w-full h-auto overflow-hidden rounded-lg">
                  <img
                    src={tv.img}
                    alt={tv.name}
                    className="h-[130px] md:h-[260px] w-full object-contain transition-all duration-300 hover:scale-110"
                  />
                </div>
              </figure>
              <div className="flex flex-col items-center text-center p-3">
                <h4 className="font-semibold truncate">{tv.name}</h4>
                <p className="truncate">Seller: {tv.sellerName}</p>
                <p className="truncate">Location: {tv.location}</p>
                <div className="flex gap-2 justify-center items-center">
                  <p className="text-xl line-through text-gray-500">TK{tv.originalPrice}</p>
                  <p className="text-xl text-primary font-semibold">TK{tv.resellPrice}</p>
                </div>
                <button
                  onClick={() => handleViewDetails(tv)}
                  className="btn mt-2 w-full bg-black text-white hover:bg-blue-500"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showModal && selectedTv && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Booking Details</h2>
            <input type="text" className="input input-bordered w-full mb-2" value={selectedTv.sellerName} readOnly />
            <input type="text" className="input input-bordered w-full mb-2" value={selectedTv.name} readOnly />
            <input type="email" className="input input-bordered w-full mb-2" value={user?.email} readOnly />
            <input type="text" className="input input-bordered w-full mb-2" value={selectedTv.location} readOnly />
            <input type="text" className="input input-bordered w-full mb-2" value={`TK ${selectedTv.resellPrice}`} readOnly />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="input input-bordered w-full mb-4"
              value={bookingDetails.phoneNumber}
              onChange={handleInputChange}
            />
            <div className="flex justify-end gap-3">
              <Link to="/dashboard/my-order">
                <button onClick={handleBooking} className="btn bg-blue-500 text-white">Confirm Booking</button>
              </Link>
              <button onClick={() => setShowModal(false)} className="btn bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 p-3 h-[55px] w-[55px] bg-gray-300 hover:bg-black text-white rounded-full shadow-lg transition-all"
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      )}
    </div>
  );
};

export default Tv;
