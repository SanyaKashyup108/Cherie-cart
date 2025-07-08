import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [sharedCartId, setSharedCartId] = useState(null); // ✅ newly added

  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increased!");
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart!");
    }
  };

  const updateQuantity = async (cartItem, productId, action) => {
    const updatedCart = cartItem.map(item => {
      if (item.id === productId) {
        let newUnit = item.quantity;
        if (action === "increase") {
          newUnit++;
          toast.success("Quantity is increased!");
        } else if (action === "decrease") {
          newUnit--;
          toast.success("Quantity is decreased!");
        }
        return newUnit > 0 ? { ...item, quantity: newUnit } : null;
      }
      return item;
    }).filter(item => item != null);

    setCartItem(updatedCart);

    if (sharedCartId) {
      const ref = doc(db, 'sharedCarts', sharedCartId);
      await updateDoc(ref, { items: updatedCart });
    }
  };

  const deleteItem = async (productId) => {
    const updated = cartItem.filter(item => item.id !== productId);
    setCartItem(updated);

    if (sharedCartId) {
      const ref = doc(db, 'sharedCarts', sharedCartId);
      await updateDoc(ref, { items: updated });
    }

    toast.success("Product is deleted from cart!");
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        deleteItem,
        sharedCartId,
        setSharedCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
