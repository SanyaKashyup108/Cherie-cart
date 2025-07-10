import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../assets/loading.gif";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const params = useParams();

  console.log(params);
  const [SingleProduct, setSingleProduct] = useState("");
  const { addToCart } = useCart();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products/${params.id}`
      );
      const product = res.data.product;
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const OriginalPrice = Math.round(
    SingleProduct.price + (SingleProduct.price * SingleProduct.discount) / 100
  );

  return (
    <>
      {SingleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={SingleProduct.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* product image */}
            <div className="w-full">
              <img
                src={SingleProduct.image}
                alt={SingleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            {/* product details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl text-xl font-bold text-pink-900">
                {SingleProduct.title}
              </h1>
              <div className="text-pink-700">
                {SingleProduct.brand?.toUpperCase()} /
                {SingleProduct.category?.toUpperCase()} /{SingleProduct.model}
              </div>
              <p className="text-xl text-pink-600 font-bold">
                ${SingleProduct.price}{" "}
                <span className="line-through text-pink-400">
                  ${OriginalPrice}
                </span>{" "}
                <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm">
                  {SingleProduct.discount}% discount
                </span>
              </p>
              <p className="text-pink-800">{SingleProduct.description}</p>
            </div>
            {/* quantity selector */}
            <div className="flex items-center gap-4">
              <label
                htmlFor=""
                className="text-sm font-medium text-pink-800"
              >
                Quantity:
              </label>
              <input
                type="number"
                min={1}
                value={1}
                className="w-20 border border-pink-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => addToCart(SingleProduct)}
                className="px-6 flex gap-2 py-2 text-lg bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-all"
              >
                <IoCartOutline className="w-6 h-6" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <img
            src={Loading}
            alt="Loading..."
            className="w-68 h-68 object-contain"
          />
        </div>
      )}
    </>
  );
};

export default SingleProduct;
