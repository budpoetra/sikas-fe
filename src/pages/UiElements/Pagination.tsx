// src/ui/Pagination/Pagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

// Tambahkan jika belum ada Lucide icons, atau ganti dengan SVG Anda
// npm install lucide-react

export interface PaginationProps {
  // Wajib
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  
  // Opsional
  totalItems?: number;
  itemsPerPage?: number;
  showInfo?: boolean;
  showPageNumbers?: boolean;
  siblingCount?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'detailed';
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage, // ← Sekarang menerima zero-based index
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  showInfo = true,
  showPageNumbers = true,
  siblingCount = 1,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const displayPage = currentPage + 1;
  // Validasi
  if (totalPages <= 0) return null;
  
  // Pastikan currentPage dalam range
  const safeCurrentPage = Math.max(1, Math.min(displayPage, totalPages));

  // Generate page numbers dengan ellipsis
  const generatePageNumbers = () => {
    const totalPageNumbers = siblingCount + 5; // siblingCount + first + last + current + 2 ellipsis
    
    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const leftSiblingIndex = Math.max(safeCurrentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(safeCurrentPage + siblingCount, totalPages);
    
    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;
    
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    
    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'ellipsis', lastPageIndex];
    }
    
    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, 'ellipsis', ...rightRange];
    }
    
    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, 'ellipsis', ...middleRange, 'ellipsis', lastPageIndex];
    }
    
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pageNumbers = generatePageNumbers();
  
  // Handler untuk page change
  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) return;
    onPageChange(page); // Kirim one-based index ke parent
  };
  
  // Size classes
  const sizeClasses = {
    sm: {
      button: 'px-2.5 py-1.5 text-xs',
      icon: 'w-3.5 h-3.5',
      info: 'text-xs',
    },
    md: {
      button: 'px-3 py-2 text-sm',
      icon: 'w-4 h-4',
      info: 'text-sm',
    },
    lg: {
      button: 'px-4 py-2.5 text-base',
      icon: 'w-5 h-5',
      info: 'text-base',
    },
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700',
    minimal: 'bg-transparent border-0',
    detailed: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm',
  };
  
  // Base classes
  const baseButtonClasses = `
    flex items-center justify-center font-medium rounded-md transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  // Button state classes
  const activeButtonClasses = `
    bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400
    hover:bg-blue-100 dark:hover:bg-blue-900/50
  `;
  
  const inactiveButtonClasses = `
    text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
    border-gray-300 dark:border-gray-600
  `;
  
  // Info text
  const startItem = Math.max((safeCurrentPage - 1) * itemsPerPage + 1, 1);
  const endItem = Math.min(safeCurrentPage * itemsPerPage, totalItems || 0);
  
  // Minimal variant - hanya tombol prev/next
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <button
          onClick={() => handlePageClick(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          className={`
            ${baseButtonClasses}
            ${sizeClasses[size].button}
            ${safeCurrentPage === 1 
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
              : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }
          `}
          aria-label="Previous page"
        >
          <ChevronLeft className={`${sizeClasses[size].icon} mr-1`} />
          Previous
        </button>
        
        {showInfo && totalItems && (
          <span className={`text-gray-600 dark:text-gray-400 ${sizeClasses[size].info} mx-4`}>
            Page {safeCurrentPage} of {totalPages}
          </span>
        )}
        
        <button
          onClick={() => handlePageClick(safeCurrentPage + 1)}
          disabled={safeCurrentPage === totalPages}
          className={`
            ${baseButtonClasses}
            ${sizeClasses[size].button}
            ${safeCurrentPage === totalPages 
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
              : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }
          `}
          aria-label="Next page"
        >
          Next
          <ChevronRight className={`${sizeClasses[size].icon} ml-1`} />
        </button>
      </div>
    );
  }
  
  // Default dan Detailed variant
  return (
    <div className={`${className}`}>
      {/* Info section */}
      {showInfo && variant === 'detailed' && totalItems && (
        <div className="mb-3">
          <p className={`text-gray-600 dark:text-gray-400 ${sizeClasses[size].info}`}>
            Showing <span className="font-semibold text-gray-800 dark:text-white">{startItem}</span> to{' '}
            <span className="font-semibold text-gray-800 dark:text-white">{endItem}</span> of{' '}
            <span className="font-semibold text-gray-800 dark:text-white">{totalItems}</span> entries
            {totalPages > 1 && (
              <>
                {' '} (Page <span className="font-semibold text-gray-800 dark:text-white">{safeCurrentPage}</span> of{' '}
                <span className="font-semibold text-gray-800 dark:text-white">{totalPages}</span>)
              </>
            )}
          </p>
        </div>
      )}
      
      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        {/* Previous button */}
        <button
          onClick={() => handlePageClick(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          className={`
            ${baseButtonClasses}
            ${sizeClasses[size].button}
            ${variantClasses[variant]}
            ${inactiveButtonClasses}
            ${safeCurrentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
            mr-2
          `}
          aria-label="Previous page"
        >
          <ChevronLeft className={sizeClasses[size].icon} />
          <span className="hidden sm:inline ml-1">Previous</span>
        </button>
        
        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {showPageNumbers && pageNumbers.map((pageNum, index) => {
            if (pageNum === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className={`
                    flex items-center justify-center
                    ${sizeClasses[size].button}
                    text-gray-500 dark:text-gray-400
                  `}
                >
                  <MoreHorizontal className={sizeClasses[size].icon} />
                </span>
              );
            }
            
            const page = pageNum as number;
            const isActive = page === safeCurrentPage;
            
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`
                  ${baseButtonClasses}
                  ${sizeClasses[size].button}
                  ${variantClasses[variant]}
                  ${isActive ? activeButtonClasses : inactiveButtonClasses}
                  min-w-[2.5rem]
                `}
                aria-label={`Page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>
        
        {/* Next button */}
        <button
          onClick={() => handlePageClick(safeCurrentPage + 1)}
          disabled={safeCurrentPage === totalPages}
          className={`
            ${baseButtonClasses}
            ${sizeClasses[size].button}
            ${variantClasses[variant]}
            ${inactiveButtonClasses}
            ${safeCurrentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
            ml-2
          `}
          aria-label="Next page"
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className={sizeClasses[size].icon} />
        </button>
      </div>
      
      {/* Info section untuk default variant */}
      {showInfo && variant === 'default' && totalItems && (
        <div className="mt-3 text-center">
          <p className={`text-gray-600 dark:text-gray-400 ${sizeClasses[size].info}`}>
            Showing {startItem} to {endItem} of {totalItems} results
          </p>
        </div>
      )}
    </div>
  );
};

export default Pagination;