import React, { useContext, useEffect, useState } from "react";
import Styles from "./Products.module.css";
import axios from "axios";
import Product from "../Product/Product";
import { Vortex } from "react-loader-spinner";
import { useQuery } from "react-query";


export default function Products() {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // async function getAllProducts() {
  //   setIsLoading(true);
  //   let {data} = await axios.get(
  //   "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   setIsLoading(false);
  //   setProducts(data.data);

  // }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, isError, data, isFetching, refetch } = useQuery(
    "allProducts",
    getAllProducts,
    {
      // cacheTime:3000,
      // refetchOnMount:false,
      // staleTime:30000
      // refetchInterval:3000
    }
  );
  // console.log("isLoading", isLoading);
  // console.log("isFetching", isFetching);

  return (
    <>
      {console.log("Products component rendered")}
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
          <div className="row">
            {data?.data.data.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
