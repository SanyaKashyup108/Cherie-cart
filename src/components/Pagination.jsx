import React from 'react'

const getPages = (current, total) => {
  const pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, '...', total);
    } else if (current >= total - 2) {
      pages.push(1, '...', total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }
  }
  return pages;
};

const Pagination = ({ page, pageHandler, dynamicPage }) => {
  return (
    <div className='mt-10 space-x-3 flex items-center justify-center text-pink-800'>
      <button 
        disabled={page === 1}
        className={`px-3 py-1 rounded-md transition-all duration-300 text-white ${
          page === 1 ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
        }`}
        onClick={() => pageHandler(page - 1)}
      >
        Prev
      </button>

      {
        getPages(page, dynamicPage)?.map((item, index) => (
          <span
            key={index}
            onClick={() => typeof item === 'number' && pageHandler(item)}
            className={`px-2 py-1 rounded-md text-sm cursor-pointer transition-colors duration-200 ${
              item === page
                ? 'bg-pink-200 text-pink-800 font-semibold'
                : 'hover:text-pink-600'
            }`}
          >
            {item}
          </span>
        ))
      }

      <button 
        disabled={page === dynamicPage}
        className={`px-3 py-1 rounded-md transition-all duration-300 text-white ${
          page === dynamicPage ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
        }`}
        onClick={() => pageHandler(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
