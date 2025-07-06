import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "react-router-dom";
import { removeFromDb } from "../../../Utilities/fakedb";
import { CartContextApi } from "../../../Context/CartContext";

const MyOrder = () => {
  const { cart, setCart } = useContext(CartContextApi);
  const { initialCart } = useLoaderData() || {};

  useEffect(() => {
    if (initialCart) {
      setCart(initialCart);
    }
  }, [initialCart, setCart]);

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    removeFromDb(id);
  };

  const { total, quantity } = cart.reduce(
    (acc, product) => {
      acc.quantity += product.quantity;
      acc.total += product.resellPrice * product.quantity;
      return acc;
    },
    { total: 0, quantity: 0 }
  );

  return (
    <div className="flex justify-center items-center py-10 px-5">
      <div className="w-full lg:w-[1100px] shadow-md rounded-lg border px-5">
        <h1 className="font-bold text-2xl my-6">Shopping Cart</h1>
        <div className="hidden md:flex justify-between items-center bg-gray-100 h-10 px-3 rounded-md">
          <p>Image</p>
          <p>Product Name</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Payment</p>
          <p>Remove</p>
        </div>
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border rounded-lg my-4 p-4"
          >
            <img
              className="w-16 h-16 object-contain"
              src={product.img}
              alt={product.details}
            />
            <h1>{product.details}</h1>
            <p>{product.quantity}</p>
            <p>TK {product.resellPrice}</p>
            <div>
              {!product.paid ? (
                <Link to={`/dashboard/payment/${product.id}`}>
                  <button className="btn btn-primary btn-sm text-white">Pay</button>
                </Link>
              ) : (
                <span className="text-success font-bold">Paid</span>
              )}
            </div>
            <button onClick={() => handleRemoveItem(product.id)}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
        ))}
        <div className="flex justify-center mt-10">
          <Link to="/home">
            <button className="btn btn-primary text-white">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
