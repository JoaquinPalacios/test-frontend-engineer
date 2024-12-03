import { GrNext, GrPrevious } from "react-icons/gr";

import { cn } from "@/utils/helpers/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
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
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="sm:px-4 px-2 py-0.5 sm:py-2 border rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none transition-colors"
      >
        <span className="sr-only">Previous</span>
        <GrPrevious />
      </button>

      {renderPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() =>
            typeof pageNumber === "number" && onPageChange(pageNumber)
          }
          className={cn(
            "sm:px-4 px-2 py-0.5 sm:py-2 border rounded-lg hover:bg-gray-500 transition-colors",
            currentPage === pageNumber
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : ""
          )}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="sm:px-4 px-2 py-0.5 sm:py-2 border rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none transition-colors"
      >
        <span className="sr-only">Next</span>
        <GrNext />
      </button>
    </div>
  );
}
