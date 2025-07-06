import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import toast from "react-hot-toast";

const CheckOutForm = ({ product }) => {
  const [clientSecret, setClientSecret] = useState("");

  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://resell-mobile-shop.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: product.resellPrice }), // Send price dynamically
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [product.resellPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: product.sellerName, // Dynamic name
            email: user?.email, // Dynamic email
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email: user?.email,
        bookingId: _id,
      };
      fetch("https://resell-mobile-shop.vercel.app/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Payment Successfully done");
            setSuccess("Your payment was successful");
            setTransactionId(paymentIntent.id);
          }
        });
    }
  };

  return (
    <>
      <form className="w-75 mt-5" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-sm btn-primary mt-4"
          type="submit"
          disabled={!stripe || clientSecret}
        >
          Pay
        </button>
      </form>
      <p className="text-danger">{cardError}</p>
      {success && (
        <div>
          <p className="text-success">{success}</p>
          <p>
            <b>{transactionId}</b>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckOutForm;
