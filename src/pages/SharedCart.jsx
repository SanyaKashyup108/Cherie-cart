import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

export default function SharedCart() {
  const { id } = useParams();
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "sharedCarts", id);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setCart(data.items || []);
      } else {
        alert("Shared cart not found.");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  const handleDelete = async (itemIndex) => {
    const updatedCart = [...cart];
    updatedCart.splice(itemIndex, 1);
    setCart(updatedCart);
    const ref = doc(db, "sharedCarts", id);
    await updateDoc(ref, { items: updatedCart });
  };

  const handleQuantityChange = async (itemIndex, type) => {
    const updatedCart = [...cart];
    const item = updatedCart[itemIndex];
    if (type === "increase") item.quantity += 1;
    if (type === "decrease" && item.quantity > 1) item.quantity -= 1;
    setCart(updatedCart);
    const ref = doc(db, "sharedCarts", id);
    await updateDoc(ref, { items: updatedCart });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-xl font-semibold text-pink-600">
        Loading shared cart...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 py-10">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">🛍️ Shared Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">This cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Cart Items */}
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-pink-50 border border-pink-200 p-4 rounded-xl shadow"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-contain" />
                  <div>
                    <h4 className="text-lg font-semibold text-pink-900">{item.name || item.title}</h4>
                    <p className="text-pink-600 font-semibold">₹{item.price}</p>
                    <p className="text-sm text-gray-500">Added by: {item.userName || "Unknown"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-pink-500 text-white rounded-md px-3 py-1 font-bold text-lg">
                    <button onClick={() => handleQuantityChange(idx, "decrease")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(idx, "increase")}>+</button>
                  </div>
                  <button onClick={() => handleDelete(idx)} className="text-red-500 hover:scale-110 transition-transform">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Bill Details */}
          <div className="bg-white border border-pink-200 rounded-xl shadow p-6 h-max space-y-4">
            <h3 className="text-xl font-bold text-pink-800 mb-2">📋 Bill Details</h3>

            <div className="flex justify-between text-pink-700">
              <span>Items Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between text-pink-700">
              <span>Delivery Charge</span>
              <span className="text-red-500 font-semibold">
                <s className="text-gray-400">₹25</s> FREE
              </span>
            </div>

            <div className="flex justify-between text-pink-700">
              <span>Handling Fee</span>
              <span className="text-red-500 font-semibold">₹5</span>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex justify-between font-bold text-lg text-pink-900">
              <span>Grand Total</span>
              <span>₹{totalPrice + 5}</span>
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-pink-700 font-medium">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="p-2 border border-pink-200 rounded-md w-full"
                />
                <button className="bg-white border border-pink-300 text-pink-700 px-4 py-1 rounded-md">Apply</button>
              </div>
            </div>

            <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md w-full mt-3">
              Checkout
            </button>

            {/* SPLIT DETAILS */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <h4 className="text-lg font-bold text-green-700 mb-2">💰 Split Payment</h4>
              <div className="flex justify-between text-gray-700">
                <p>Your share:</p>
                <p>₹{Math.round(totalPrice / 2)}</p>
              </div>
              <div className="flex justify-between text-gray-700 mt-1">
                <p>Friend’s share:</p>
                <p>₹{Math.floor(totalPrice / 2)}</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">* This is a 50-50 split based on total cart value.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
