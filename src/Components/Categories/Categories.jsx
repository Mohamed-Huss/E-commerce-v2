import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./Categories.module.css";
import { Vortex } from "react-loader-spinner";
import { useQuery } from "react-query";
import SubCategories from "../SubCategories/SubCategories";

export default function Categories() {
  // const [categories, setCategories]= useState([])
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(()=>{
  //   getAllCategories()
  // }, [])

  // async function getAllCategories()
  // {setIsLoading(true)
  //   let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  //   setIsLoading(false)
  //   setCategories(data.data)
  //   console.log(data.data)
  // }

  const [selectedCategory, setSelectedCategory] = useState(null)
console.log(selectedCategory)
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { isLoading, isError, data, isFetching } = useQuery(
    "allCategories",
    getAllCategories
  );

  return (
    <div className="container">
      {isLoading ? (
        <div
          className={`${Styles.loading} d-flex justify-content-center align-items-center`}
        >
          <Vortex
            visible={true}
            height="300"
            width="300"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      ) : (
        <div className="row g-4 my-2">
          {data?.data.data.map((category) => {
            return (
              <div className="col-md-3" key={category._id} onClick={()=>setSelectedCategory({categoryId:category._id , categoryName:category.name})}>
                <div className={`card ${Styles.card} cursor-pointer`}>
                  <img
                    className={`px-0 w-100" ${Styles.img} `}
                    height={250}
                    src={category.image}
                  />
                  <div className="card-body">
                    <h3 className="fw-bold text-main mt-1 text-center h6">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
<SubCategories clickedCategory={selectedCategory}/>
    </div>
  );
}
