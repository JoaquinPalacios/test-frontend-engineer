"use client";

import { useState } from "react";

import { useQuery } from "@apollo/client";

import { GET_PRODUCTS } from "@/graphql/queries/products";
import { Product } from "@/types/product";
import { useScreenDetector } from "@/utils/hooks/useScreenDetector";

import { Pagination } from "../Pagination";
import ProductCard from "../ProductCard";

const ProductGrid = () => {
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
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {currentProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {products.length > productsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      )}
    </>
  );
};

export default ProductGrid;
