import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-pink-700">About Cherie Cart</h1>

        <p className="text-pink-900 text-lg">
          Welcome to <span className="font-semibold text-pink-600">Cherie Cart</span>, your one-stop destination for the latest and greatest in electronics. From cutting-edge gadgets to must-have accessories, we’re here to power up your tech life with premium products and unbeatable service.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-600">Our Mission</h2>
          <p className="text-pink-900 text-base">
            At Cherie Cart, our mission is to make innovative technology accessible to everyone. We’re passionate about connecting people with the tools and tech they need to thrive in a digital world — all at competitive prices and delivered with speed and care.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-600">Why Choose Cherie Cart?</h2>
          <ul className="list-disc pl-6 text-pink-900 space-y-2">
            <li>Top-quality electronic products from trusted brands</li>
            <li>Lightning-fast and secure shipping</li>
            <li>Reliable customer support, always ready to help</li>
            <li>Easy returns and hassle-free shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-600">Our Vision</h2>
          <p className="text-pink-900 text-base">
            We envision a future where technology elevates everyday life. At Cherie Cart, we’re committed to staying ahead of the curve, offering cutting-edge solutions that are both practical and affordable.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-pink-600 mb-2">Join the Cherie Cart Family</h3>
          <p className="text-pink-900 mb-4">
            Whether you’re a tech enthusiast, a professional, or just looking for something cool and functional — Cherie Cart has something for everyone.
          </p>
          <Link to={'/product'}>
            <button className="bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700 transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
