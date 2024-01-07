import React, { useEffect, useState } from 'react'
import Styles from "./CategorySlider.module.css"
import axios from 'axios';
import Slider from "react-slick";
import { Vortex } from "react-loader-spinner";
import { useQuery} from 'react-query';

export default function CategorySlider() {
// const [categories, setCategories]= useState([])

//   useEffect(()=>{
//     getAllCategories()
//   }, [])
  
//   async function getAllCategories()
//   {
//     let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
//     setCategories(data.data)
//   }


function getAllCategories(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
}

let {isLoading, isError, data, isFetching} = useQuery("allCategories", getAllCategories)


  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (<>
  {/* {console.log('category component rendered')} */}
  {isLoading ? (
          <div
            className={`${Styles.loading} d-flex justify-content-center align-items-center`}
          >
            <Vortex
              visible={true}
              height="150"
              width="150"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
          </div>
        ) : <> <h5 className="mb-0">Shop popular categories</h5>
          <Slider {...settings} className='p-0 mt-1'>
{data?.data.data.map((category)=>{return <div key={category._id}><img className="px-0 w-100" height={200} src={category.image}/>
<h5 className='font-sm text-main mt-1 text-center'>{category.name}</h5></div>})}
          </Slider></>}
  
 </>)
}
