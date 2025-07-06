
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { addToDb } from "../Utilities/fakedb";

export const CartContextApi = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const handleAddToCart = (selectedProduct) => {
    if (!selectedProduct || !selectedProduct.id) {
      toast.error("Invalid product data");
      return;
    }

    const existingProduct = cart.find(
      (product) => product.id === selectedProduct.id
    );

    let updatedCart = [];
    if (existingProduct) {
      // If product already exists in cart, update its quantity
      updatedCart = cart.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      toast.success("Product quantity updated!");
    } else {
      // If product is new to the cart
      updatedCart = [...cart, { ...selectedProduct, quantity: 1 }];
      toast.success("Product added successfully!");
    }

    setCart(updatedCart);
    addToDb(selectedProduct.id);
  };

  // Clear the cart (optional functionality)
  const handleClearCart = () => {
    setCart([]);
    toast.success("Cart cleared!");
  };

  return (
    <CartContextApi.Provider
      value={{
        cart,
        handleAddToCart,
        handleClearCart, // Expose clear cart functionality if needed
      }}
    >
      {children}
    </CartContextApi.Provider>
  );
};

export default CartContext;
