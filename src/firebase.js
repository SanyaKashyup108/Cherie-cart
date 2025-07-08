// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUquuQGwXQY9urmy_BPYdq9PlMmW-9eM4",
  authDomain: "cherie-cart.firebaseapp.com",
  projectId: "cherie-cart",
  storageBucket: "cherie-cart.firebasestorage.app",
  messagingSenderId: "350858595684",
  appId: "1:350858595684:web:888524cb008a1bfc36be71",
  measurementId: "G-V5WT2MDD59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);