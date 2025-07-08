import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContextApi } from "../../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Mobile = () => {
  const { user } = useContext(AuthContext);
  const { handleAddToCart } = useContext(CartContextApi);
  const [selectedMobiles, setSelectedMobiles] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    phoneNumber: "",
  });
  const {
    data: mobiles = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["mobiles"],
    queryFn: async () => {
      const res = await fetch("https://mobile-shop-silk.vercel.app/mobile");
      if (!res.ok) {
        throw new Error("Failed to fetch mobiles");
      }
      return res.json();
    },
  });


  useEffect(() => {
    if (error) {
      toast.error("Failed to load mobiles. Please try again.");
    }
  }, [error]);

  const handleViewDetails = (mobile) => setSelectedMobiles(mobile);
  const handleBackToList = () => setSelectedMobiles(null);

  const handleAppointment = (event) => {
    event.preventDefault();
    const form = event.target;
    const booking = {
      serviceName: selectedMobiles.name,
      name: user?.displayName,
      email: user?.email,
      phone: bookingDetails.phoneNumber,
    };

    fetch("https://resell-mobile-shop.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          form.reset();
          toast.success("Booking Successfully Done!👏");
          setShowModal(false);
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };

  const handleBooking = () => {
    toast.success("Booking successfully completed!");
    setShowModal(false);
    handleAddToCart(selectedMobiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  // Scroll to Top Button
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 100);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            Loading Mobiles, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[100px] md:mt-[140px] mb-[50px] flex justify-center">
      <ToastContainer />

      {/* Single Product View */}
      {selectedMobiles ? (
        <div className="w-full max-w-2xl bg-base-100 shadow-xl p-5">
          <img src={selectedMobiles.img} alt={selectedMobiles.name} className="rounded-lg mb-5" />
          <h2 className="text-2xl font-bold mb-2">{selectedMobiles.name}</h2>
          <p className="mb-2 font-semibold">Category: {selectedMobiles.category}</p>
          <p className="mb-2 font-semibold">Details: {selectedMobiles.details}</p>
          <p className="mb-2 font-semibold">Seller: {selectedMobiles.sellerName}</p>
          <p className="mb-2 font-semibold">Location: {selectedMobiles.location}</p>
          <p className="mb-2 font-semibold">Years of Use: {selectedMobiles.yearsOfUse} Years</p>
          <p className="mb-2 font-semibold line-through">
            Original Price: {selectedMobiles.originalPrice}.00 TK
          </p>
          <p className="mb-4 text-primary font-bold">
            Resell Price: {selectedMobiles.resellPrice}.00 TK
          </p>
          <div className="flex gap-4">
            <button onClick={() => setShowModal(true)} className="btn bg-black text-white hover:bg-red-500">Book Now</button>
            <button onClick={handleBackToList} className="btn bg-gray-300 hover:bg-gray-400">Back to List</button>
          </div>
        </div>
      ) : (
        // Product Grid View
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {mobiles.map((mobile) => (
            <div
              key={mobile._id}
              className="rounded-md mx-0 bg-base-100 hover:shadow-2xl group relative md:w-[200px] xl:h-[450px] xl:w-[300px]"
            >
              <figure>
                <div className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                  <img
                    className="h-[130px] md:h-[260px] cursor-pointer w-full object-contain relative z-0 rounded-lg transition-all duration-300 hover:scale-110"
                    src={mobile.img}
                    onError={(e) => (e.target.src = "/notFoundImg.png")}
                    alt={mobile.name}
                  />
                </div>
              </figure>
              <div className="flex justify-center text-center my-3">
                <div className="max-w-xs overflow-hidden text-ellipsis px-2">
                  <h4 className="font-semibold">{mobile.name}</h4>
                  <p className="truncate">Seller: {mobile.sellerName}</p>
                  <p className="truncate">Location: {mobile.location}</p>
                  <div className="md:flex justify-center items-center xl:gap-3">
                    <p className="font-semibold text-xl line-through text-[#969696]">TK {mobile.originalPrice}</p>
                    <p className="font-semibold text-xl text-primary">TK {mobile.resellPrice}</p>
                  </div>
                  <div className="card-actions justify-center">
                    <button
                      onClick={() => handleViewDetails(mobile)}
                      className="btn rounded-sm sm:w-[150px] md:w-[230px] xl:w-[450px] mt-3 text-[19px] hover:bg-blue-500 bg-black text-white"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showModal && (
        <form onSubmit={handleAppointment}>
          <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Booking Details</h2>

              <input readOnly value={selectedMobiles.sellerName} className="input input-bordered w-full mb-2" />
              <input readOnly value={selectedMobiles.name} className="input input-bordered w-full mb-2" />
              <input readOnly value={user?.email} className="input input-bordered w-full mb-2" />
              <input readOnly value={selectedMobiles.location} className="input input-bordered w-full mb-2" />
              <input readOnly value={`TK ${selectedMobiles.resellPrice}`} className="input input-bordered w-full mb-2" />
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                className="input input-bordered w-full mb-2"
                value={bookingDetails.phoneNumber}
                onChange={handleInputChange}
              />

              <div className="flex justify-end gap-4 mt-4">
                <Link to="/dashboard/my-order">
                  <button type="submit" className="btn bg-blue-500 text-white">Confirm Booking</button>
                </Link>
                <button onClick={() => setShowModal(false)} type="button" className="btn bg-gray-300 hover:bg-gray-400">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Scroll to Top */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 p-3 h-[55px] w-[55px] bg-gray-300 rounded-full shadow-lg hover:bg-black hover:text-white transition-all flex items-center justify-center"
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faAngleUp} />
        </button>
      )}
    </div>
  );
};

export default Mobile;
