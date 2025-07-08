import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContextApi } from "../../../Context/CartContext";
import { AuthContext } from "../../../Context/AuthProvider";
import { Link } from "react-router-dom";

const AllCategories = () => {
  const { handleAddToCart } = useContext(CartContextApi);
  const { user } = useContext(AuthContext);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    phoneNumber: "",
  });

  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://mobile-shop-silk.vercel.app/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  const handleViewDetails = (category) => setSelectedCategories(category);
  const handleBackToList = () => setSelectedCategories(null);

  const handleBooking = () => {
    toast.success("Booking successfully completed!");
    setShowModal(false);
    handleAddToCart(selectedCategories);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

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
          <p className="mt-2 text-lg font-semibold text-gray-700">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load categories.
      </div>
    );
  }

  return (
    <div className="mt-[100px] md:mt-[140px] mb-[50px] flex justify-center">
      <ToastContainer />
      {selectedCategories ? (
        // DETAILS VIEW
        <div className="w-full max-w-2xl bg-base-100 shadow-xl p-5">
          <img
            src={selectedCategories.img}
            alt={selectedCategories.name}
            className="rounded-lg mb-5"
          />
          <h2 className="text-2xl font-bold mb-2">{selectedCategories.name}</h2>
          <h2 className="text-2xl font-semibold mb-3">
            Category: {selectedCategories.category}
          </h2>
          <p className="mb-2 font-semibold">Details: {selectedCategories.details}</p>
          <p className="mb-2 font-semibold">Seller: {selectedCategories.sellerName}</p>
          <p className="mb-2 font-semibold">Location: {selectedCategories.location}</p>
          <p className="mb-2 font-semibold">Years of Uses: {selectedCategories.yearsOfUse} Years</p>
          <p className="mb-2 font-semibold">
            Original Price: <span className="line-through">{selectedCategories.originalPrice} TK</span>
          </p>
          <p className="mb-4 text-primary font-bold">
            Resell Price: {selectedCategories.resellPrice} TK
          </p>
          <div className="flex gap-4">
            <button onClick={() => setShowModal(true)} className="btn bg-black text-white hover:bg-red-500">
              Book Now
            </button>
            <button onClick={handleBackToList} className="btn bg-gray-300 hover:bg-gray-400">
              Back to List
            </button>
          </div>
        </div>
      ) : (
        // CATEGORY LIST VIEW
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-md bg-base-100 hover:shadow-2xl group relative md:w-[200px] xl:h-[450px] xl:w-[300px]"
            >
              <figure>
                <div className="w-full h-auto overflow-hidden rounded-lg">
                  <img
                    className="h-[130px] md:h-[260px] w-full object-contain cursor-pointer transition-all duration-300 hover:scale-110"
                    src={category.img}
                    alt={category.name}
                  />
                </div>
              </figure>
              <div className="text-center my-3 px-2">
                <h4 className="font-semibold">{category.name}</h4>
                <p>Seller: {category.sellerName}</p>
                <p>Location: {category.location}</p>
                <div className="md:flex justify-center gap-3">
                  <p className="font-semibold text-xl line-through text-[#969696]">
                    TK{category.originalPrice}
                  </p>
                  <p className="font-semibold text-xl text-primary">
                    TK{category.resellPrice}
                  </p>
                </div>
                <button
                  onClick={() => handleViewDetails(category)}
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
      {showModal && selectedCategories && (
        <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Booking Details</h2>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">Seller Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                readOnly
                value={selectedCategories.sellerName}
              />
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">Product Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                readOnly
                value={selectedCategories.name}
              />
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">Email Address</label>
              <input
                type="email"
                className="input input-bordered w-full"
                readOnly
                value={user?.email || ""}
              />
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">Location</label>
              <input
                className="input input-bordered w-full"
                readOnly
                value={selectedCategories.location}
              />
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">Resell Price (TK)</label>
              <input
                type="text"
                readOnly
                value={selectedCategories.resellPrice}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700">Mobile Number</label>
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
              <button
                onClick={() => setShowModal(false)}
                className="btn bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
