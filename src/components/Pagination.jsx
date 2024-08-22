import React, { useState } from 'react';

const Pagination = ({
  entriesPerPage,
  totalEntries,
  paginate,
  currentPage,
}) => {
  const [pageGroup, setPageGroup] = useState(0);
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const maxPageDisplay = 10;

  const startPage = pageGroup * maxPageDisplay + 1;
  const endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setPageGroup(pageGroup + 1);
    }
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex list-none">
        <li className={`mx-1 ${startPage === 1 ? 'opacity-50' : ''}`}>
          <button
            onClick={handlePrevGroup}
            disabled={startPage === 1}
            className="px-3 py-1 border bg-white text-black hover:bg-gray-300"
          >
            &lt;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`mx-1 ${number === currentPage ? 'font-bold' : ''}`}
          >
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 border ${
                number === currentPage
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-black hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li className={`mx-1 ${endPage === totalPages ? 'opacity-50' : ''}`}>
          <button
            onClick={handleNextGroup}
            disabled={endPage === totalPages}
            className="px-3 py-1 border bg-white text-black hover:bg-gray-300"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
