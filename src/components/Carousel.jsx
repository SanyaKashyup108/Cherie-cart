import React, { useEffect } from 'react'
import {  DataProvider, getData } from '../context/DataContext';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft ,AiOutlineArrowRight} from 'react-icons/ai';
import Category from './Category';


const Carousel = () => {
    const {data, fetchAllProducts} = getData();
    console.log(data);

  useEffect(() => {
    fetchAllProducts();
  },[])

  const SamplePrevArrow = (props) => {
    const { className, style, onClick} = props;
    return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: 3,
        left: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        background: "#56021F",
        borderRadius: "9999px",
      }}
      onClick={onClick}
    >
      <AiOutlineArrowLeft color="white" />
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: 3,
        right: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        background: "#56021F",
        borderRadius: "9999px",
      }}
      onClick={onClick}
    >
      <AiOutlineArrowRight color="white" />
    </div>
  );
}
var settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover:false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
  return (
    <div>

      <Slider {...settings}>
        {
            data?.slice(0,7).map((item, index) => {
                return <div key={index} className='bg-gradient-to-r from-[#EC7FA9] via-[#FFB8E0] to-[#FFEDFA] -z-10 h-[750px] w-auto '>
                  <div className='flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4 '>
                    <div className='md:space-y-6 space-y-3'>
                      <h3 className='text-[#56021F] font-semibold font-sans text-sm'>"Style meets sound — in your favorite color."</h3>
                      <h1 className='md:text-4xl text-xl font-bold uppercase md:line-clamp-3 line-clamp-2  md:w-[500px] text-white'>{item.title}</h1>
                      <p className='md:w-[500px] line-clamp-3 text-[#BE5985] pr-7'>{item.description}</p>
                      <button className='bg-[#56021F] text-white px-3 py-2 rounded-md cursor-pointer mt-2]'>Shop Now</button>
                    </div>
                    <div>
                        <img src={item.image} alt={item.title} className='rounded-full w-[550px]  hover:scale-105 transition-all shadow-2xl shadow-[#56021F]'/>
                    </div>
                  </div>
                </div>
            }
      )  }
      
    
    </Slider>

    <Category/>

    </div>
  )
}

export default Carousel
