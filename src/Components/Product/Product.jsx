import React, { useContext, useState } from "react";
import Styles from "./Product.module.css";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";

export default function Product({product}) {
const Navigate = useNavigate()
const { userToken} = useContext(UserContext);
const {addToCart, setNumOfCartItems} = useContext(cartContext)
const [isLoading, setIsLoading] = useState(false);

async function addProduct(productId){
  setIsLoading(true)
  let {data} = await addToCart(productId)
  setIsLoading(false)
  if(data?.status =="success")
  {
 toast.success('Product has been add successfully',{duration:2000, })
 setNumOfCartItems(data.numOfCartItems)
  }
  else
  {
 toast.error('Unexpected error, please try again',{duration:2000, })
  }


  console.log(data)
}


  return (
    <>
    {console.log('Product component rendered')}
      <div className="col-md-2">
       
          <div className="product cursor-pointer px-2 py-3">
          <Link to={`/ProductDetails/${product?.id}`} className="text-decoration-none text-reset">
            <img
              className="w-100"
              src={product?.imageCover}
              alt="product image"
            />
            <h5 className="font-sm text-main mt-2">{product?.category.name}</h5>
            <h2 className="h6">
              {product?.title.split(" ").slice(0, 2).join(" ")}
            </h2>
            <p className="d-flex justify-content-between">
              <span>{product?.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color"></i>{" "}
                {product?.ratingsAverage}{" "}
              </span>
            </p>
           </Link>
           <button disabled ={isLoading} className="btn bg-main w-100"  onClick={userToken? ()=>addProduct(product.id): ()=>Navigate("/Login")}>+ Add</button>
          </div> 
        
      </div>
    </>
  );
}
