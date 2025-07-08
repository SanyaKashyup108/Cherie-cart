import axios from "axios";
import React, { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";


export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();

  // fetch data from an API 
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.in/api/products?limit=150')
     console.log(response)
     const productsData = response.data.products 
        setData(productsData);
     
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

const getUniqueCategory = (data, property) => {
    let newVAL = data?.map((curElem) => {
      return curElem[property];
    });
    newVAL = [ "ALL",...new Set(newVAL)]
    return newVAL;
  };

  const CategoryOnlyData = getUniqueCategory(data, "category");
const brandOnlyData = getUniqueCategory(data, "brand")
  return <DataContext.Provider value={{data, setData, fetchAllProducts , CategoryOnlyData , brandOnlyData}}>
    {children}
    </DataContext.Provider>;
};



export const getData =() => useContext(DataContext);