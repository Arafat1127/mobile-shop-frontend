import React, { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { CartContextApi } from "../../../Context/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe("pk_test_51RdxMHB0SPCqBM9Qsk6fGKDu5VPaQqoxlmCsHyDW5YoK4IRuaQwUfZTkNiqujGpQbOH7tKUTGmS6QHGleGbT3HF800fIxdpZu7");

const Payment = () => {
  const { cart, setCart } = useContext(CartContextApi);
  const { initialCart } = useLoaderData() || {};

  useEffect(() => {
    if (initialCart) {
      setCart(initialCart);
    }
  }, [initialCart, setCart]);

  return (
    <div>
      {cart.map((product) => (
        <div key={product.id}>
          <h1>
            Payment for{" "}
            <span className="text-2xl font-bold text-primary">{product.name}</span>
          </h1>
          <p>
            Please Pay <b>{product.resellPrice} TK</b> for your booking
          </p>

          <div>
            <Elements stripe={stripePromise}>
              <CheckOutForm product={product} /> {/* Pass product as prop */}
            </Elements>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payment;
