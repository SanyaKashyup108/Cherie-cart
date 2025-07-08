import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import axios from 'axios'
import { useState } from 'react'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import ProtectedRoute from './components/ProtectedRoute'
import { useCart } from './context/CartContext'
import SharedCart from "./pages/SharedCart"


const App = () => {

  const [location, setLocation] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
 const { cartItem, setCartItem } = useCart()

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords;
        console.log("Coordinates:", latitude, longitude);

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&accept-language=en`;
        try {
          const response = await axios.get(url);
          const exactLocation = response.data.address;
          setLocation(exactLocation);
          setOpenDropdown(false);
          console.log("Exact location:", exactLocation);
        } catch (error) {
          console.error("Axios error:", error);
        }
      },
      error => {
        console.error("Geolocation error:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by your browser.");
  }
};


  useEffect(() => {
    getLocation();
  }, []);

    //Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  }, []);

  //save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])


  return (
    <>
      <BrowserRouter>
        <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path='/category/:category' element={<CategoryProduct />}></Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart"  element={ <ProtectedRoute>
            <Cart location={location} getLocation={getLocation}  />  </ProtectedRoute> }  />
            <Route path="/shared-cart/:id" element={<SharedCart />} />
           
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
