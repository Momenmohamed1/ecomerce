"use client";

import { useState } from "react";
import { CartContext } from "./_context/CartContext";

/**
 * Keeps the cart state on the client so the root layout can stay a
 * server component (metadata, SEO, static rendering).
 */
export default function CartProvider({ children }) {
  const [cart, setcart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setcart }}>
      {children}
    </CartContext.Provider>
  );
}
