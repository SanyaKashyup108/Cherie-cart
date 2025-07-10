// import React from 'react'
// import { getData } from '../context/DataContext';

// const FilterSection = ({search, setSearch, brand, setBrand, priceRange, setPriceRange, category, setCategory , handleBrandChange, handleCategoryChange}) => {
//   const { CategoryOnlyData, brandOnlyData } = getData();

//   return (
//     <div className='bg-pink-100 mt-10 p-4 rounded-md h-max  hidden md:block shadow-md'>
//       {/* Search */}
//       <input 
//         type="text" 
//         placeholder='Search products...' 
//         value={search}
//         onChange={(e) => setSearch(e.target.value)} 
//         className='bg-white p-2 rounded-md border border-pink-300 w-full focus:outline-none focus:ring-2 focus:ring-pink-400' 
//       />
      
//       {/* Category Filter */}
//       <h1 className='mt-6 font-semibold text-lg text-pink-800'>Category</h1>
//       <div className='flex flex-col gap-2 mt-2'>
//         { 
//           CategoryOnlyData?.map((item, index) => {
//             return <div key={index} 
//             className='flex gap-2 items-center text-pink-700'>
//               <input 
//                 type="checkbox" 
//                 name={item} 
//                 checked={category === item} 
//                 value={item} 
//                 onChange={handleCategoryChange}
//                 className="accent-pink-600"
//               />
//               <button className='uppercase cursor-pointer'>{item}</button>
//             </div>
// })
//         }
//       </div>

//       {/* Brand Filter */}
//       <h1 className='mt-6 font-semibold text-lg text-pink-800'>Brand</h1>
//       <select 
//       name=""
//       id=""
//         className='bg-white w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 mt-2 text-pink-700' 

//         value={brand}
//         onChange={handleBrandChange}
//       >
//         {
//           brandOnlyData?.map((item, index) => (
//             <option key={index} value={item}>{item.toUpperCase()}</option>
//           ))
//         }
//       </select>

//       {/* Price Range */}
//       <h1 className='mt-6 font-semibold text-lg text-pink-800 mb-3'>Price Range</h1>
//       <div className='flex flex-col gap-2 text-pink-700'>
//         <label>Price: ${priceRange[0]} - ${priceRange[1]}</label>
//         <input 
//           type="range" 
//           min="0" 
//           max="5000" 
//           name=""
//           id=""
//           value={priceRange[1]} 
//           onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} 
//           className='accent-pink-600'
//         />
//       </div>

//       {/* Reset Button */}
//       <button 
//         className='bg-pink-600 hover:bg-pink-700 text-white rounded-md px-3 py-2 mt-6 w-full transition-all duration-300'
//         onClick={() => {
//           setSearch('');
//           setCategory('All');
//           setBrand('All');
//           setPriceRange([0, 5000]);
//         }}
//       >
//         Reset Filters
//       </button>
//     </div>
//   )
// }

// export default FilterSection;

import React from 'react';
import { getData } from '../context/DataContext';

const FilterSection = ({
  search, setSearch,
  brand, setBrand,
  priceRange, setPriceRange,
  category, setCategory,
  handleBrandChange, handleCategoryChange
}) => {

  const { CategoryOnlyData, brandOnlyData } = getData();

  return (
    <aside className='fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-pink-100 p-4 overflow-y-auto rounded-r-md shadow-md z-20 hidden md:block'>
      {/* Search */}
      <input 
        type="text" 
        placeholder='Search products...' 
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        className='bg-white p-2 rounded-md border border-pink-300 w-full focus:outline-none focus:ring-2 focus:ring-pink-400' 
      />
      
      {/* Category Filter */}
      <h1 className='mt-6 font-semibold text-lg text-pink-800'>Category</h1>
      <div className='flex flex-col gap-2 mt-2'>
        { 
          CategoryOnlyData?.map((item, index) => (
            <div key={index} className='flex gap-2 items-center text-pink-700'>
              <input 
                type="checkbox" 
                name={item} 
                checked={category === item} 
                value={item} 
                onChange={handleCategoryChange}
                className="accent-pink-600"
              />
              <button className='uppercase cursor-pointer'>{item}</button>
            </div>
          ))
        }
      </div>

      {/* Brand Filter */}
      <h1 className='mt-6 font-semibold text-lg text-pink-800'>Brand</h1>
      <select 
        value={brand}
        onChange={handleBrandChange}
        className='bg-white w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 mt-2 text-pink-700'
      >
        {
          brandOnlyData?.map((item, index) => (
            <option key={index} value={item}>{item.toUpperCase()}</option>
          ))
        }
      </select>

      {/* Price Range */}
      <h1 className='mt-6 font-semibold text-lg text-pink-800 mb-3'>Price Range</h1>
      <div className='flex flex-col gap-2 text-pink-700'>
        <label>Price: ${priceRange[0]} - ${priceRange[1]}</label>
        <input 
          type="range" 
          min="0" 
          max="5000"
          value={priceRange[1]} 
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} 
          className='accent-pink-600'
        />
      </div>

      {/* Reset Button */}
      <button 
        className='bg-pink-600 hover:bg-pink-700 text-white rounded-md px-3 py-2 mt-6 w-full transition-all duration-300'
        onClick={() => {
          setSearch('');
          setCategory('All');
          setBrand('All');
          setPriceRange([0, 5000]);
        }}
      >
        Reset Filters
      </button>
    </aside>
  )
};

export default FilterSection;

