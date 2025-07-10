import React, { useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '@clerk/clerk-react';
import { uploadCart } from "../utils/shareCart";
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import emptyCart from "../assets/empty-cart.png";

const Cart = ({ location, getLocation }) => {
  const { cartItem, setCartItem, updateQuantity, deleteItem, sharedCartId, setSharedCartId } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (!sharedCartId) return;
    const unsub = onSnapshot(doc(db, 'sharedCarts', sharedCartId), (docSnap) => {
      const data = docSnap.data();
      if (data?.items) {
        setCartItem(data.items);
      }
    });
    return () => unsub();
  }, [sharedCartId]);

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {cartItem.length > 0 ? (
        <div>
          <h1 className='font-bold text-2xl text-pink-800'>My Cart ({cartItem.length})</h1>

          <button
            onClick={async () => {
              const cartId = await uploadCart(cartItem, user);
              const shareLink = `${window.location.origin}/shared-cart/${cartId}`;
              navigator.clipboard.writeText(shareLink);
              setSharedCartId(cartId);
              alert("Cart link copied! Share it with your friend ✨");
            }}
            className="bg-pink-600 text-white px-4 py-2 rounded-md my-4 hover:bg-pink-700 transition-all"
          >
            Share Cart 🛒
          </button>

          <div className='mt-10 space-y-4'>
            {cartItem.map((item, index) => (
              <div key={index} className='bg-pink-100 p-5 rounded-xl flex items-center justify-between shadow-sm'>
                <div className='flex items-center gap-4'>
                  <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md object-contain' />
                  <div>
                    <h1 className='md:w-[300px] line-clamp-2 text-pink-900 font-semibold'>{item.title}</h1>
                    <p className='text-pink-600 font-semibold text-lg'>${item.price}</p>
                  </div>
                </div>
                <div className='bg-pink-500 text-white flex gap-4 px-3 py-1 rounded-md font-bold text-xl'>
                  <button onClick={() => updateQuantity(cartItem, item.id, "decrease")}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(cartItem, item.id, "increase")}>+</button>
                </div>
                <span onClick={() => deleteItem(item.id)} className='hover:bg-white/70 transition-all rounded-full p-3 hover:shadow-xl'>
                  <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
                </span>
              </div>
            ))}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-10'>
            {/* Delivery Info */}
            <div className='bg-white rounded-xl p-7 shadow-md space-y-4 border border-pink-200'>
              <h1 className='text-pink-800 font-bold text-xl'>Delivery Info</h1>
              <div className='flex flex-col gap-2'>
                <label>Full Name</label>
                <input type="text" value={user?.fullName} readOnly className='p-2 rounded-md border border-pink-200' />
              </div>
              <div className='flex flex-col gap-2'>
                <label>Address</label>
                <input type="text" value={location?.county} readOnly className='p-2 rounded-md border border-pink-200' />
              </div>
              <div className='flex gap-4'>
                <div className='flex flex-col gap-2 w-full'>
                  <label>State</label>
                  <input type="text" value={location?.state} readOnly className='p-2 rounded-md border border-pink-200' />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label>PostCode</label>
                  <input type="text" value={location?.postcode} readOnly className='p-2 rounded-md border border-pink-200' />
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex flex-col gap-2 w-full'>
                  <label>Country</label>
                  <input type="text" value={location?.country} readOnly className='p-2 rounded-md border border-pink-200' />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label>Phone No</label>
                  <input type="text" placeholder='Enter your number' className='p-2 rounded-md border border-pink-200' />
                </div>
              </div>
              <button className='bg-pink-600 text-white px-3 py-2 rounded-md mt-4 w-full'>Submit</button>
              <div className='text-center text-gray-400'>— OR —</div>
              <button onClick={getLocation} className='bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-md w-full'>Detect Location</button>
            </div>

            {/* Bill Section */}
            <div className='bg-white border border-pink-200 shadow-md rounded-xl p-7 space-y-4 h-max mt-5 md:mt-0'>
              <h1 className='text-pink-800 font-bold text-xl'>Bill Details</h1>
              <div className='flex justify-between text-pink-700'>
                <span className='flex items-center gap-2'><LuNotebookText /> Items Total</span>
                <span>${totalPrice}</span>
              </div>
              <div className='flex justify-between text-pink-700'>
                <span className='flex items-center gap-2'><MdDeliveryDining /> Delivery Charge</span>
                <span className='text-red-500'><s className='text-gray-400'>$25</s> FREE</span>
              </div>
              <div className='flex justify-between text-pink-700'>
                <span className='flex items-center gap-2'><GiShoppingBag /> Handling</span>
                <span className='text-red-500'>$5</span>
              </div>
              <hr />
              <div className='flex justify-between font-semibold text-lg text-pink-800'>
                <span>Grand Total</span>
                <span>${totalPrice + 5}</span>
              </div>

              <div className='space-y-2 mt-4'>
                <label className='text-pink-700'>Promo Code</label>
                <div className='flex gap-2'>
                  <input type="text" placeholder='Enter code' className='p-2 rounded-md border border-pink-200 w-full' />
                  <button className='bg-white border border-pink-200 text-pink-700 px-4 py-1 rounded-md'>Apply</button>
                </div>
              </div>
              <button className='bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md w-full mt-4'>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-pink-700 font-bold text-4xl text-center'>Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="Empty cart" className='w-[350px]' />
          <button onClick={() => navigate('/products')} className='bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md'>Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
