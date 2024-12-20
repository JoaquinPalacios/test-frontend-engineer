"use client";
import { useState } from "react";
import { IoMdCart } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Link from "next/link";

import Cart from "@/components/Cart";
import { useCart } from "@/features/hooks/use-cart";
import { cn } from "@/utils/helpers/cn";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  /**
   * Toggle cart
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  /**
   * Close cart
   */
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white py-4 flex justify-center items-center">
      <nav className="container flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Game Store
        </Link>
        <button onClick={toggleCart} className="relative">
          <span className="sr-only">Cart</span>
          <IoMdCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        {/* Sidebar */}
        <div
          className={cn(
            "fixed top-0 right-0 w-64 bg-slate-500 h-full shadow-lg transform transition-transform duration-300 ease-in-out z-50",
            isCartOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <button
            onClick={toggleCart}
            className="absolute top-4 right-4 text-gray-800"
          >
            <IoCloseSharp size={24} color="white" />
          </button>
          <Cart onCheckout={closeCart} />
        </div>

        {/* Overlay */}
        {isCartOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleCart}
            aria-hidden="true"
          />
        )}
      </nav>
    </header>
  );
}
