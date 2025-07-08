import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
   const {addToCart, cartItem} = useCart()
   console.log(cartItem)

  return (
    <div className='border relative border-pink-200 bg-white rounded-2xl cursor-pointer p-2 h-max shadow-md hover:shadow-pink-200 transition-shadow duration-300'>
      <img src={product.image} alt="" className='bg-pink-50 aspect-square rounded-xl'  onClick={()=>navigate(`/product/${product.id}`)} />
      
      <h1 className='line-clamp-2 p-1 font-semibold text-pink-800'>{product.title}</h1>
      
      <p className='my-1 text-lg text-pink-700 font-bold'>${product.price}</p>
      
      <button 
        onClick={() => addToCart(product)} 
        className='bg-pink-600 hover:bg-pink-700 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold transition-colors duration-300'
      >
        <IoCartOutline className='w-6 h-6' /> Add to Cart
      </button>
    </div>
  )
}

export default ProductCard;
