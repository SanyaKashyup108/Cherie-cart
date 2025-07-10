// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useCart } from '../context/CartContext'

// const ProductListView = ({product}) => {
//   const navigate = useNavigate()
//   const {addToCart} = useCart()

//   return (
//     <div className='space-y-4 mt-2 rounded-md'>
//       <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
//         <img src={product.image} alt={product.title} className='md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer' onClick={()=>navigate(`/product/${product.id}`)}/>
//         <div className='space-y-2'>
//           <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full w-[220px]'>{product.title}</h1>
//           <p className='font-semibold flex items-center md:text-lg text-sm'>$<span className='md:text-4xl text-3xl'>{product.price}</span> ({product.discount}% off)</p>
//           <p className='text-sm'>FREE delivery <span className='font-semibold'>Fri, 18 Apr</span> <br />
//           Or fastest delivery <span className='font-semibold'>Tomorrow, 17 Apr</span></p>
//           <button onClick={()=>addToCart(product)} className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductListView


import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  return (
    <div className='space-y-4 mt-4 rounded-md'>
      <div className='bg-pink-50 flex flex-col md:flex-row gap-6 md:gap-7 items-center p-4 rounded-xl shadow-md transition-all duration-300'>
        <img
          src={product.image}
          alt={product.title}
          className='md:h-60 md:w-60 h-40 w-40 rounded-xl object-contain cursor-pointer hover:scale-105 transition-transform duration-300'
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <div className='space-y-3 text-pink-800'>
          <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-pink-600 md:w-full w-[220px] transition-colors duration-300'>
            {product.title}
          </h1>
          <p className='font-semibold flex items-center md:text-lg text-sm text-pink-700'>
            $<span className='md:text-4xl text-3xl ml-1'>{product.price}</span>
            <span className='ml-2 text-sm text-pink-600'>({product.discount}% off)</span>
          </p>
          <p className='text-sm text-pink-700'>
            FREE delivery <span className='font-semibold'>Fri, 18 Apr</span> <br />
            Or fastest delivery <span className='font-semibold'>Tomorrow, 17 Apr</span>
          </p>
          <button
            onClick={() => addToCart(product)}
            className='bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition-all duration-300'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView
