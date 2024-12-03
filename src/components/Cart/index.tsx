'use client';
import Image from 'next/image';

import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (totalItems === 0) {
    return (
      <div className="p-4 text-center">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-400">
      <h2 className="text-2xl font-bold mb-4">Your Cart ({totalItems} items)</h2>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 border rounded-lg p-4">
            <div className="relative w-24 h-24">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-green-600">${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-auto text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 text-right">
          <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}