// Pagination display in the bottom
"use client";

import type { PaginationInfo } from "@/types/movie";

interface PaginationProps {
  pagination: PaginationInfo | null;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }
  // Constants declaration for page before, after etc
  const { page, totalPages, total } = pagination;
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show with ellipsis
      if (page <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Results Info */}
      <div className="text-zinc-400 text-sm">
        Showing page <span className="text-amber-500 font-bold">{page}</span> of{" "}
        <span className="text-white font-bold">{totalPages}</span>
        <span className="text-zinc-600 mx-2">•</span>
        <span className="text-white font-bold">
          {total.toLocaleString()}
        </span>{" "}
        total results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!canGoPrevious}
          className="px-4 py-2 rounded-lg bg-zinc-900 border-2 border-zinc-800 text-white font-medium hover:border-amber-500 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-zinc-800 disabled:hover:text-white transition-all duration-200"
          aria-label="Previous page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {getPageNumbers().map((pageNum, index) => {
            if (pageNum === "...") {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-zinc-600">
                  ...
                </span>
              );
            }

            const isActive = pageNum === page;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum as number)}
                className={`min-w-[44px] px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                    : "bg-zinc-900 border-2 border-zinc-800 text-white hover:border-amber-500 hover:text-amber-500"
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!canGoNext}
          className="px-4 py-2 rounded-lg bg-zinc-900 border-2 border-zinc-800 text-white font-medium hover:border-amber-500 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-zinc-800 disabled:hover:text-white transition-all duration-200"
          aria-label="Next page"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
