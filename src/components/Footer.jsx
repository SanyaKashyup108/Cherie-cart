import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-pink-900 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <Link to="/">
            <h1 className="text-3xl font-bold text-pink-600 mb-2">Cherie Cart</h1>
          </Link>
          <p className="text-sm">"Style meets tech — in your favorite color."</p>
          <p className="text-sm mt-2">Patna, Bihar, India</p>
          <p className="text-sm">support@cheriecart.com</p>
        </div>

        {/* Customer Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-pink-700">Customer Service</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/">Shipping & Returns</Link></li>
            <li><Link to="/">FAQs</Link></li>
            <li><Link to="/">Order Tracking</Link></li>
            <li><Link to="/">Help Center</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-pink-700">Follow Us</h3>
          <div className="flex space-x-4 text-2xl text-pink-600">
            <FaFacebook className="hover:text-pink-800" />
            <FaInstagram className="hover:text-pink-800" />
            <FaTwitterSquare className="hover:text-pink-800" />
            <FaPinterest className="hover:text-pink-800" />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-pink-700">Stay Updated</h3>
          <p className="text-sm mb-3">Get the latest updates, offers & more!</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-l-md text-pink-900 placeholder:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-pink-300 pt-4 text-center text-sm text-pink-600">
        &copy; {new Date().getFullYear()} Cherie Cart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
