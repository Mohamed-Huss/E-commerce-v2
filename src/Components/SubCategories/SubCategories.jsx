import React from 'react'
import Styles from "./SubCategories.module.css"
import { useQuery } from 'react-query';
import axios from 'axios';
import { Vortex } from "react-loader-spinner";

export default function SubCategories({clickedCategory}) {
  function getSubCategories(categoryId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
  }

  let {isLoading, isError, data, isFetching} = useQuery(
    ["subCategories",clickedCategory],
    ()=> getSubCategories(clickedCategory.categoryId), {enabled:!!(clickedCategory)}
  );
  return <>
 <div className="container">
      {isLoading ? (
        <div
          className={`d-flex justify-content-center align-items-center`}
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
        <div className="row g-4 my-5">
         {data? <h2 className='text-main fw-bolder text-center mb-2'> {clickedCategory?.categoryName} subcategory</h2>:""}
          {data?.data.data.map((subcategory) => {
            return (
              <div className="col-md-4" key={subcategory._id}>
                <div className={`card ${Styles.card}`}>
                <h4 className='fw-bolder text-center p-4'>{subcategory.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
 </>
}
