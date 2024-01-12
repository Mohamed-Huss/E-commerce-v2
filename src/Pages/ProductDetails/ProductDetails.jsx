import React, { useContext, useEffect, useState } from "react";
import Styles from "./ProductDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Vortex } from "react-loader-spinner";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";


export default function ProductDetails() {
const Navigate = useNavigate()

const [loading, setLoading] = useState(false)
const {userToken}= useContext(UserContext)
  const params = useParams();
  // const [productDetails, setProductDetails] = useState({});
  // const [isLoading, setIsLoading]= useState(false)
  // useEffect(()=>{
  // getProductDetails(params.id)
  // }, [])
const{setNumOfCartItems, addToCart} = useContext(cartContext)
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // async function getProductDetails(productId){
  //   setIsLoading(true)
  //   let { data } = await axios.get(
  //   `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  //   );
  //   setIsLoading(false)
  //   setProductDetails(data.data);

  // }


  async function addProduct(productId){
    setLoading(true)
    let response = await addToCart(productId)
    setLoading(false)
    if(response.data.status =="success")
    {
   toast.success('Product has been add successfully',{duration:2000, })
   setNumOfCartItems(response.data.numOfCartItems)
    }
    else
    {
   toast.error('Unexpected error, please try again',{duration:2000, })
    }
  
  
  }

  function getProductDetails({ id }) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { isLoading, isError, data, isFetching } = useQuery(
    "productDetail",
    () => getProductDetails(params),
    {
      // cacheTime:3000,
      // refetchOnMount:false,
      // staleTime:30000,
      // refetchInterval:3000
    }
  );

  return (
    <>
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
        <div className="row align-items-center">
          <div className="col-md-3">
            <Slider {...settings}>
              {data?.data.data.images.map((img, index) => (
                <img key={index} className="w-100" src={img} />
              ))}
            </Slider>
            {/* {console.log(data?.data.data.imageCover)} */}
          </div>
          <div className="col-md-9">
            <h2>{data?.data.data.title}</h2>
            <p>{data?.data.data.description}</p>
            <h6 className="font-sm text-main">
              {data?.data.data.category.name}
            </h6>
            {/* {console.log(data?.data.data.category?.name)} */}
            <p className="d-flex justify-content-between m-0">
              <span>{data?.data.data.price} EGP</span>
               <span> <i className="fas fa-star rating-color"></i>
                {data?.data.data.ratingsAverage}
              </span>
            </p>
            {/* <span>{data?.data.data.ratingsQuantity} <span className="text-main">Ratings</span>
            </span> */}
            <button disabled={loading} onClick={userToken? ()=>addProduct(params.id):()=>Navigate("/Login")} className="btn bg-main text-white w-100 mt-2">
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
