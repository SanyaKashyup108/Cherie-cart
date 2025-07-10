import React from 'react'
import { FaFilter } from 'react-icons/fa6'
import { getData } from '../context/DataContext'

const MobileFilter = ({
  openFilter, setOpenFilter,
  search, setSearch,
  brand, setBrand,
  priceRange, setPriceRange,
  category, setCategory,
  handleBrandChange, handleCategoryChange
}) => {

  const { categoryOnlyData, brandOnlyData } = getData()

  const toggleFilter = () => {
    setOpenFilter(!openFilter)
  }

  return (
    <>
      {/* Filter Toggle Bar */}
      <div className='bg-pink-100 flex justify-between items-center md:hidden px-4 py-3 mt-5 rounded-md shadow-sm'>
        <h1 className='font-semibold text-lg text-pink-800'>Filters</h1>
        <FaFilter onClick={toggleFilter} className='text-pink-700 text-xl cursor-pointer' />
      </div>

      {/* Filter Section */}
      {
        openFilter ? (
          <div className='bg-pink-50 p-4 mt-2 rounded-md shadow-md md:hidden'>
            {/* Search Input */}
            <input
              type="text"
              placeholder='Search products...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='bg-white p-2 rounded-md border border-pink-300 w-full focus:outline-none focus:ring-2 focus:ring-pink-400'
            />

            {/* Category Filter */}
            <h1 className='mt-5 font-semibold text-pink-800 text-lg'>Category</h1>
            <div className='flex flex-col gap-2 mt-2'>
              {
                categoryOnlyData?.map((item, index) => (
                  <div key={index} className='flex gap-2 items-center text-pink-700'>
                    <input
                      type="checkbox"
                      name={item}
                      checked={category === item}
                      value={item}
                      onChange={handleCategoryChange}
                      className="accent-pink-600"
                    />
                    <span className='uppercase text-sm'>{item}</span>
                  </div>
                ))
              }
            </div>

            {/* Brand Filter */}
            <h1 className='mt-5 font-semibold text-pink-800 text-lg'>Brand</h1>
            <select
              className='bg-white w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 mt-2 text-pink-700'
              value={brand}
              onChange={handleBrandChange}
            >
              {
                brandOnlyData?.map((item, index) => (
                  <option key={index} value={item}>{item.toUpperCase()}</option>
                ))
              }
            </select>

            {/* Price Range */}
            <h1 className='mt-5 font-semibold text-pink-800 text-lg'>Price Range</h1>
            <div className='flex flex-col gap-2 text-pink-700'>
              <label>Price: ${priceRange[0]} - ${priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className='accent-pink-600 w-full'
              />
            </div>

            {/* Reset Button */}
            <button
              className='bg-pink-600 hover:bg-pink-700 text-white rounded-md px-4 py-2 mt-6 w-full transition-all duration-300'
              onClick={() => {
                setSearch('');
                setCategory('All');
                setBrand('All');
                setPriceRange([0, 5000]);
                setOpenFilter(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : null
      }
    </>
  )
}

export default MobileFilter
