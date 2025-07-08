import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

export default function SharedCart() {
  const { id } = useParams();
  const { user } = useUser();
  const currentUserEmail = user?.primaryEmailAddress?.emailAddress;

  const [cart, setCart] = useState([]);
  const [sharedCartData, setSharedCartData] = useState(null);
  const [loading, setLoading] = useState(true);



useEffect(() => {
  const ref = doc(db, "sharedCarts", id);

  const unsubscribe = onSnapshot(ref, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      setCart(data.items || []);
      setSharedCartData(data);
    } else {
      alert("Shared cart not found.");
    }
    setLoading(false);
  });

  return () => unsubscribe(); // cleanup listener on unmount
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

  const isAllowedToEdit = true; // ✅ Anyone with the link can edit

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-xl font-semibold text-pink-600">
        Loading shared cart...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">🛍️ Shared Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">This cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-pink-50 border border-pink-200 p-4 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16" />
                <div>
                  <h4 className="text-lg font-medium">{item.name || item.title}</h4>
                  <p className="text-pink-600 font-semibold">₹{item.price}</p>
                  <p className="text-sm text-gray-500">Added by: {item.userName || "Unknown"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleQuantityChange(idx, "decrease")}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleQuantityChange(idx, "increase")}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(idx)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <div className="mt-10 p-5 bg-green-50 border border-green-200 rounded-md shadow">
            <h3 className="text-xl font-bold text-green-700 mb-4">💰 Split Payment</h3>
            <div className="flex justify-between text-lg font-medium text-gray-700">
              <p>Your share:</p>
              <p>₹{Math.round(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) / 2)}</p>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-700 mt-2">
              <p>Friend’s share:</p>
              <p>₹{Math.floor(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) / 2)}</p>
            </div>
            <p className="text-sm text-gray-500 mt-3">* This is a 50-50 split based on total cart value.</p>
          </div>
        </div>
      )}
    </div>
  );
}
