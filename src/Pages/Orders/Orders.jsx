import React, { useContext, useEffect, useState } from "react"; import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../Utilities/fakedb";
import { CartContextApi } from "../../Context/CartContext";

const Orders = () => {
  const { cart, setCart } = useContext(CartContextApi);
  const { initialCart } = useLoaderData() || {};

  // Ensure cart state is initialized from loader
  useEffect(() => {
    if (initialCart && initialCart.length) {
      setCart(initialCart);
    }
  }, [initialCart, setCart]);

  // Calculate totals
  const { total, quantity } = cart.reduce(
    (acc, product) => {
      const productTotal = product.resellPrice * product.quantity;
      acc.quantity += product.quantity;
      acc.total += productTotal;
      return acc;
    },
    { total: 0, quantity: 0 }
  );

  // Remove item from cart
  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    removeFromDb(id);
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // Scroll-to-top functionality
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(window.pageYOffset > 100);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="h-auto flex justify-center items-center py-10 mx-5">
      <div className="w-full lg:w-[1100px] xl:w-[1200px] shadow px-5 rounded-lg border">
        <h1 className="font-bold text-2xl my-6">Shopping Cart</h1>
        <div className="hidden md:flex justify-between items-center bg-gray-100 h-10 px-3 rounded-md">
          <p>Image</p>
          <p>Product Name</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Remove</p>
        </div>

        {cart.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border shadow-md rounded-lg my-4 p-4"
          >
            <img
              className="w-16 h-16 object-contain"
              src={product.img}
              alt={product.details}
            />
            <p className="w-20">{product.details}</p>
            <p>{product.quantity}</p>
            <p>TK {product.resellPrice}</p>
            <button onClick={() => handleRemoveItem(product._id)}>
              <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />
            </button>
          </div>
        ))}

        <div className="flex flex-col md:flex-row justify-between items-center my-7">
          <div className="w-full md:w-1/3">
            <p>Total Selected Items: {quantity}</p>
            <p>Total: TK {total}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="btn btn-primary text-white rounded-sm"
            >
              Clear Cart
            </button>
            <Link to="/home" className="btn btn-primary rounded-sm">
              Continue Shopping
            </Link>
          </div>
        </div>

        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 p-3 bg-gray-700 text-white rounded-full shadow-lg"
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Orders;
