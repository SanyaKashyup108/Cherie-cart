import React, { useEffect } from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  //const { CategoryOnlyData } = getData();
   const navigate = useNavigate()
    const {data} = getData()


 const getUniqueCategory = (data, property) =>{
      let newVAL = data?.map((curElem) =>{
          return curElem[property]
      })
      newVAL = [...new Set(newVAL)]
      return newVAL
    }
 
    const categoryOnlyData = getUniqueCategory(data, "category")
  

  return (
    <div className="bg-pink-50">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {
        categoryOnlyData?.map((item, index) => {
          return (
            <div key={index}>
              <button onClick={()=>navigate(`/category/${item}`)} className="uppercase bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-all duration-300 shadow-md">
                {item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
