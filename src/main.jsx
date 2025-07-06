import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import CartContext from "./Context/CartContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client = {queryClient}>
 <AuthProvider>
      <CartContext>
        <App />
      </CartContext>
    </AuthProvider>

    </QueryClientProvider>
   
  </StrictMode>
);
