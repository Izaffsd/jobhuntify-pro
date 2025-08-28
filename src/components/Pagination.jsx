import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (currentPage > 4) pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        if (currentPage < totalPages - 3) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200
          ${currentPage === 1
            ? "border-base-300 text-base-content/40 cursor-not-allowed"
            : "border-base-300 text-base-content/70 hover:border-base-content/30 hover:bg-base-200 cursor-pointer"}
        `}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="flex items-center justify-center w-10 h-10 text-base-content/50">
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`
                flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 font-medium cursor-pointer
                ${page === currentPage
                  ? "bg-primary text-primary-content border-primary shadow-sm"
                  : "border-base-300 text-base-content hover:border-base-content/30 hover:bg-base-200"}
              `}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200
          ${currentPage === totalPages
            ? "border-base-300 text-base-content/40 cursor-not-allowed"
            : "border-base-300 text-base-content/70 hover:border-base-content/30 hover:bg-base-200 cursor-pointer"}
        `}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
