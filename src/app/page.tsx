"use client";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@apollo/client";

import { GET_PRODUCTS } from "@/graphql/queries/products";
import { cn } from "@/utils/helpers/cn";
import { useScreenDetector } from "@/utils/hooks/useScreenDetector";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isTablet, isMobile } = useScreenDetector();
  const productsPerPage = isTablet ? 4 : isMobile ? 1 : 6;

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Ensure data.products is an array and calculate pagination
  const products = Array.isArray(data?.products) ? data.products : [];
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    if (totalPages <= maxPageNumbersToShow) {
      // If 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Handle start of pagination
      if (currentPage <= 3) {
        // Show first 5 pages + ellipsis + last page
        for (let i = 2; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
      // Handle end of pagination
      else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 5 pages
        pageNumbers.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
      // Handle middle pages
      else {
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <main className="w-full">
      <div className="container py-16">
        <h1 className="text-5xl font-bold mb-6">Game Store</h1>
        <p className="text-lg text-gray-600 mb-12">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {currentProducts.map((product: any) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="border rounded-lg flex flex-col gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 p-4">
                <h2 className="font-semibold line-clamp-1">{product.title}</h2>
                <p className="text-green-600 font-bold">${product.price}</p>
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
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {products.length > productsPerPage && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="sm:px-4 px-2 py-0.5 sm:py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="sr-only">Previous</span>
              <GrPrevious />
            </button>

            {renderPageNumbers().map((pageNumber, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof pageNumber === "number" && paginate(pageNumber)
                }
                className={cn(
                  "sm:px-4 px-2 py-0.5 sm:py-2 border rounded-lg hover:bg-gray-100",
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : ""
                )}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="sm:px-4 px-2 py-0.5 sm:py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="sr-only">Next</span>
              <GrNext />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
