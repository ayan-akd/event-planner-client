"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();

  // Handle Previous
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`);
    }
  };

  // Handle Next
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`);
    }
  };
  return (
    <ul className="flex justify-center gap-1 text-gray-900">
      <li onClick={handlePrevious} className="cursor-pointer">
        <span
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 dark:text-white"
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </li>

      {[...Array(totalPages)]?.map((_, idx) => (
        <li
          className="cursor-pointer"
          key={idx}
          onClick={() => {
            setCurrentPage(idx + 1);
            router.push(`${pathname}?page=${idx + 1}`, {
              scroll: false,
            });
          }}
        >
          <span
            className={`block size-8 rounded border ${
              currentPage === idx + 1
                ? "bg-primary text-white"
                : "bg-gray-50 text-black"
            }  border-gray-200 text-center text-sm/8 font-medium transition-colors`}
          >
            {idx + 1}
          </span>
        </li>
      ))}

      <li onClick={handleNext} className="cursor-pointer">
        <a
          href="#"
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 dark:text-white"
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
