'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
  
    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
    if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    
  return (
    <>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
    {currentProducts.map((product: any) => (
      <Link 
        href={`/product/${product.id}`} 
        key={product.id}
        className="border rounded-lg flex flex-col gap-4 hover:shadow-lg transition-shadow"
      >
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <h2 className="font-semibold line-clamp-2">{product.title}</h2>
          <p className="text-green-600 font-bold">${product.price}</p>
          
        </div>
      </Link>
    ))}
  </div>
  
  {/* Pagination */}
  <div className="flex justify-center gap-2 mt-8">
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
    >
      Previous
    </button>
    
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index + 1}
        onClick={() => paginate(index + 1)}
        className={`px-4 py-2 border rounded-lg hover:bg-gray-100 
          ${currentPage === index + 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
      >
        {index + 1}
      </button>
    ))}
    
    <button
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
    >
      Next
    </button>
  </div>
  </>
  )
};

export default Products;
