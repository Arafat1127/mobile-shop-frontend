import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CartContextApi } from "../../../Context/CartContext";
import { AuthContext } from "../../../Context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Laptop = () => {
  const { handleAddToCart } = useContext(CartContextApi);
  const { user } = useContext(AuthContext);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ phoneNumber: "" });
  const [isVisible, setIsVisible] = useState(false);

  // Fetch laptops using TanStack Query
  const { data: laptops = [], isLoading, isError } = useQuery({
    queryKey: ["laptops"],
    queryFn: async () => {
      const res = await fetch("https://mobile-shop-silk.vercel.app/laptops");
      if (!res.ok) throw new Error("Failed to fetch laptops");
      return res.json();
    },
  });

  // Scroll to top button toggle
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.pageYOffset > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = () => {
    toast.success("Booking successfully completed!");
    setShowModal(false);
    handleAddToCart(selectedLaptop);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C4.477 0 0 4.477 0 12h4zm2 5.291A7.97 7.97 0 014 12H0c0 3.161 1.035 6.078 2.766 8.435l3.234-3.144z"
            />
          </svg>
          <p className="mt-2 text-lg font-semibold text-gray-700">Loading Laptops, please wait...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load laptop data from server.");
    return (
      <div className="text-center mt-20 text-red-500 font-semibold text-xl">
        Failed to load laptops. Please try again later.
      </div>
    );
  }

  return (
    <div className="mt-[100px] md:mt-[140px] mb-[50px] flex justify-center">
      <ToastContainer />


      {selectedLaptop ? (
        <div className="w-full max-w-2xl bg-base-100 shadow-xl p-5">
          <img src={selectedLaptop.img} alt={selectedLaptop.name} className="rounded-lg mb-5" />
          <h2 className="text-2xl font-bold mb-2">{selectedLaptop.name}</h2>
          <h2 className="text-2xl font-semibold mb-3">Category: {selectedLaptop.category}</h2>
          <p className="mb-2 font-semibold">Details: {selectedLaptop.details}</p>
          <p className="mb-2 font-semibold">Seller: {selectedLaptop.sellerName}</p>
          <p className="mb-2 font-semibold">Location: {selectedLaptop.location}</p>
          <p className="mb-2 font-semibold">Years of Use: {selectedLaptop.yearsOfUse} Years</p>
          <p className="mb-2 font-semibold line-through">Original Price: {selectedLaptop.originalPrice} TK</p>
          <p className="mb-4 text-primary font-bold">Resell Price: {selectedLaptop.resellPrice} TK</p>
          <div className="flex gap-4">
            <button onClick={() => setShowModal(true)} className="btn bg-black text-white hover:bg-red-500">Book Now</button>
            <button onClick={() => setSelectedLaptop(null)} className="btn bg-gray-300 hover:bg-gray-400">Back to List</button>
          </div>
        </div>
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {laptops.map((laptop) => (
            <div
              key={laptop.id}
              className="rounded-md bg-base-100 hover:shadow-2xl md:w-[200px] xl:h-[450px] xl:w-[300px]"
            >
              <figure>
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    className="h-[130px] md:h-[260px] w-full object-contain cursor-pointer transition-all duration-300 hover:scale-110"
                    src={laptop.img}
                    alt={laptop.name}
                  />
                </div>
              </figure>
              <div className="text-center my-3 px-2">
                <h4 className="font-semibold py-2 truncate">{laptop.name}</h4>
                <p className="truncate">Seller: {laptop.sellerName}</p>
                <p className="truncate">Location: {laptop.location}</p>
                <div className="md:flex justify-center gap-3">
                  <p className="font-semibold text-xl line-through text-[#969696]">TK {laptop.originalPrice}</p>
                  <p className="font-semibold text-xl text-primary">TK {laptop.resellPrice}</p>
                </div>
                <button
                  onClick={() => setSelectedLaptop(laptop)}
                  className="btn mt-3 w-full hover:bg-blue-500 bg-black text-white"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && selectedLaptop && (
        <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Booking Details</h2>
            <div className="mb-2">
              <label className="block font-bold">Seller Name</label>
              <input type="text" className="input input-bordered w-full" readOnly value={selectedLaptop.sellerName} />
            </div>
            <div className="mb-2">
              <label className="block font-bold">Product Name</label>
              <input type="text" className="input input-bordered w-full" readOnly value={selectedLaptop.name} />
            </div>
            <div className="mb-2">
              <label className="block font-bold">Email</label>
              <input type="email" className="input input-bordered w-full" readOnly value={user?.email || ""} />
            </div>
            <div className="mb-2">
              <label className="block font-bold">Location</label>
              <input className="input input-bordered w-full" readOnly value={selectedLaptop.location} />
            </div>
            <div className="mb-2">
              <label className="block font-bold">Resell Price (TK)</label>
              <input type="text" readOnly value={selectedLaptop.resellPrice} className="input input-bordered w-full" />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Mobile Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                value={bookingDetails.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Link to="/dashboard/my-order">
                <button onClick={handleBooking} className="btn bg-blue-500 text-white">
                  Confirm Booking
                </button>
              </Link>
              <button onClick={() => setShowModal(false)} className="btn bg-gray-300 hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCROLL TO TOP */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 p-3 h-[55px] w-[55px] bg-gray-300 hover:bg-black hover:text-white rounded-full shadow-lg transition-all flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faAngleUp} className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Laptop;
