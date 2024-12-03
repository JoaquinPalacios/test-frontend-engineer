"use client";
import { useState } from "react";
import Link from "next/link";

import { useCart } from "@/features/hooks/use-cart";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOrderPlaced(true);

    clearCart();
  };

  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4 font-bold">
              <span>Total: ${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {!orderPlaced ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

            <div>
              <label htmlFor="name" className="block mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="address" className="block mb-2">
                Address
              </label>
              <textarea
                id="address"
                required
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Place Order
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Order Placed!</h2>
            <p className="mb-6">Thank you for your purchase!</p>
            <Link
              href="/"
              className="text-white bg-blue-600 py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
