import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useCart } from "../context/CartContext";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
  const { cartItem } = useCart();
  const [openNav, setOpenNav] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center ">
        {/* Logo Section */}
        <div className="flex items-center gap-7">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl pacifico">
              <span className="logo"> Cherie </span>Cart
            </h1>
          </Link>
          <div className="md:flex gap-1 cursor-pointer text-pink-500 items-center hidden">
            <MapPin className="text-pink-500" />
            <span className="font-semibold">
              {location ? (
                <div className="flex flex-col leading-tight text-sm">
                  <p>
                    {location.city ||
                      location.town ||
                      location.village ||
                      "Unknown City"}
                  </p>
                  {location.state}, {location.country}
                </div>
              ) : (
                "Add Address "
              )}
            </span>
            <FaCaretDown onClick={toggleDropdown} />
          </div>

          {openDropdown ? (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span onClick={toggleDropdown}>
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-pink-500 text-white px-3 py-1 rounded-md w-full hover:bg-pink-600 transition-all duration-300"
              >
                Detect My Location
              </button>
            </div>
          ) : null}
        </div>
        {/* menu-section  */}

        <nav className="flex items-center gap-6">
          <ul className="md:flex gap-6 text-gray-600 font-semibold hidden ">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-pink-500 border-b-2 border-pink-500 font-semibold"
                    : "text-gray-600 border-b-2 border-transparent hover:text-pink-500 hover:border-pink-500 transition-all duration-300 font-semibold"
                }`
              }
            >
              {" "}
              <li>Home</li>{" "}
            </NavLink>

            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-pink-500 border-b-2 border-pink-500 font-semibold"
                    : "text-gray-600 border-b-2 border-transparent hover:text-pink-500 hover:border-pink-500 transition-all duration-300 font-semibold"
                }`
              }
            >
              {" "}
              <li> About</li>
            </NavLink>
            <NavLink
              to={"/product"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-pink-500 border-b-2 border-pink-500 font-semibold"
                    : "text-gray-600 border-b-2 border-transparent hover:text-pink-500 hover:border-pink-500 transition-all duration-300 font-semibold"
                }`
              }
            >
              {" "}
              <li> Product</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-pink-500 border-b-2 border-pink-500 font-semibold"
                    : "text-gray-600 border-b-2 border-transparent hover:text-pink-500 hover:border-pink-500 transition-all duration-300 font-semibold"
                }`
              }
            >
              {" "}
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative ">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-pink-500 px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartItem.length}
            </span>
          </Link>
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className="bg-pink-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {openNav ? (
            <HiMenuAlt3
              onClick={() => setOpenNav(false)}
              className="h-7 w-7 md:hidden"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className="h-7 w-7 md:hidden"
            />
          )}
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
};

export default Navbar;
