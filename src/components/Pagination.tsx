import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  totalPages,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation" className="flex justify-center">
      <ul className="inline-flex items-center -space-x-px mt-8">
        <li>
          <div
            onClick={() => paginate(currentPage <= 1 ? 1 : currentPage - 1)}
            className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-r-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            Previous
          </div>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={number}>
            <div
              onClick={() => paginate(number)}
              className={`py-2 px-3 leading-tight text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                index === pageNumbers.length - 1 ? "border-r-2" : ""
              }`}
              aria-current={number === currentPage ? "page" : undefined}
            >
              {number}
            </div>
          </li>
        ))}
        <li>
          <div
            onClick={() =>
              paginate(currentPage >= totalPages ? totalPages : currentPage + 1)
            }
            className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            Next
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
