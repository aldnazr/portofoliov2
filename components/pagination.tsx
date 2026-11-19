"use client";

import { ArrowIcon } from "@/components/svg-icons/icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div
      className={
        className ??
        "flex items-center justify-center gap-2 mt-12"
      }
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-hairline bg-overlay text-xs font-medium text-foreground-soft hover:bg-overlay-strong hover:text-foreground disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
        aria-label="Halaman sebelumnya"
      >
        <ArrowIcon direction="left" className="size-3.5 shrink-0" />
        Prev
      </button>

      <div className="flex items-center gap-1.5 px-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            type="button"
            className={`w-8 h-8 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
              currentPage === page
                ? "bg-accent-wash-strong text-accent-strong border border-accent-wash-border font-bold"
                : "bg-overlay text-muted border border-hairline hover:bg-overlay-strong hover:text-foreground"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-hairline bg-overlay text-xs font-medium text-foreground-soft hover:bg-overlay-strong hover:text-foreground disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
        aria-label="Halaman berikutnya"
      >
        Next
        <ArrowIcon direction="right" className="size-3.5 shrink-0" />
      </button>
    </div>
  );
}

export default Pagination;
