import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { PaginationProps } from "~/types/common/interfaces";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:border-[#1C1E87] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors
            ${page === currentPage 
              ? "bg-[#1C1E87] text-white" 
              : "border border-gray-300 hover:border-[#1C1E87] hover:text-[#1C1E87]"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:border-[#1C1E87] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;