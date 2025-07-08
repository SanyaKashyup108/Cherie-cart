import React from 'react'
import banner from '../assets/banner1.jpg'

const MidBanner = () => {
  return (
    <div className="bg-pink-50 md:py-24">
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px]"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* White transparent overlay */}
        <div className="absolute inset-0 bg-white/60 md:rounded-2xl flex items-center justify-center">
          <div className="text-center text-pink-900 px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover Chic Tech Essentials
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
              Curated electronics just for you — stylish, reliable, and delivered with love.
            </p>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MidBanner
