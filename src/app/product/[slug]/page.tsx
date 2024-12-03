'use client';
import { Suspense,use,useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

function ProductContent({ slug }: { slug: string }) {
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  /**
   * Fetch product from API
   */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
        setLoading(false);
        
        // Check if product is already in cart and set initial quantity
        const cartItem = cart.find(item => item.id === parseInt(slug));
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, cart]);

  /**
   * Render loading state
   */
  if (loading || !product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  /**
   * Handle quantity change
   */
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  /**
   * Handle add to cart
   */
  const handleAddToCart = () => {
    if (quantity >= 1) {
      addToCart({ ...product, quantity });
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <Link 
        href="/" 
        className="inline-block mb-8 text-blue-600 hover:underline"
      >
        ← Back to products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          
          <div className="flex items-center gap-4">
            <p className="text-2xl text-green-600 font-bold">
              ${product.price}
            </p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <AiFillStar className="text-yellow-400" />
                {product.rating.rate}
              </span>
              <span className="text-sm text-gray-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Category</h2>
            <p className="text-gray-600 capitalize">{product.category}</p>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductContent slug={resolvedParams.slug} />
    </Suspense>
  );
}
