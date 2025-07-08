import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const uploadCart = async (cartItems, user, friendEmail = null) => {
  try {
    const sharedCartRef = await addDoc(collection(db, "sharedCarts"), {
      items: cartItems.map((item) => ({
        ...item,
        userName: user?.fullName || "Unknown",
        userId: user?.id || "unknown",
        addedBy: user?.primaryEmailAddress?.emailAddress || "unknown"
      })),
      users: [
        user?.primaryEmailAddress?.emailAddress,
        friendEmail || "friend@example.com"
      ],
      owner: user?.primaryEmailAddress?.emailAddress,
      createdAt: new Date()
    });

    return sharedCartRef.id;
  } catch (err) {
    console.error("Error uploading cart:", err);
    return null;
  }
};
