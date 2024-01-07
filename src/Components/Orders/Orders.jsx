import React, {useContext, useEffect, useState } from 'react'
import Styles from "./Orders.module.css"
import { jwtDecode } from "jwt-decode"
import axios from 'axios'
import { Vortex } from "react-loader-spinner";
import { cartContext } from '../../Context/CartContext';
import { OrdersContext } from '../../Context/OrdersContext';

export default function Orders() {

  const [allOrders, setAllOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const token = localStorage.getItem("userToken")
  const decoded = jwtDecode(token)
  const {id:userId} = decoded;
  console.log(userId)

// const {getAllUserOrders} = useContext(OrdersContext)

  async function getOrders(userId){
  setIsLoading(true)
  const {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userId}`)
  setAllOrders(data)
  setIsLoading(false)
  console.log(allOrders)
}

useEffect(()=>{
getOrders(userId)
}, [])

return (
  <>
    {console.log(allOrders)}
    {!isLoading ? (
      allOrders.length === 0 ? (
        <div className="w-75 mx-auto my-2 p-3 bg-main-light">
          <h3 className="text-main">Sorry! There is no order history available at the moment</h3>
        </div>
      ) : (
        <div className="w-75 mx-auto my-2 p-3 bg-main-light">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3>Your Orders</h3>
            </div>
          </div>
          {allOrders?.map((item) => (
            <div key={item._id} className="row border-bottom py-2 px-2">
              <h4 className="h6 mb-3"><span className='text-main fw-bolder text-main'>Order Number:</span> {item._id}</h4>
              <div className='d-flex justify-content-between algin-items-center'>
                <div>
              <h6 className="h6 font-sm"><span className='text-main'>Total order price:</span> {item.totalOrderPrice} EGP</h6>
              <h6 className="h6  font-sm"><span className='text-main'>Payment method:</span> {item.paymentMethodType}</h6></div>
              <div>
              {item.isPaid? <h6 className="h6  font-sm"><span className='text-main'>Due Amount: </span>Paid</h6>:""}
              {item.isDelivered? <h6 className="h6  font-sm"><span className='text-main'>Order status:</span> Delivered</h6>:<h6 className="h6  font-sm"><span className='text-main'>Order status:</span> Pending delivery</h6>}
              </div>
              </div>
              <h6 className='text-main fw-bolder text-main my-3'>List of ordered items:</h6>
              {item.cartItems.map((product) => (
                <div key={`${product._id}"details"`} className="row">
                  <div key={`${product._id}"image"`} className="col-md-1 my-2">
                    <img className="img-fluid" src={product.product.imageCover} alt={`Product: ${product.product.title}`} />
                  </div>
                  <div key={`${product._id}"details"`} className="col-md-11 my-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="h6">{product.product.title.split(" ").slice(0, 3).join(" ")}</h3>
                        <h6 className="text-main">Price: {product.price} EGP</h6>
                      </div>
                      <div>
                        <span className='text-main'>Quantity</span>: {product.count}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    ) : (
      <div className={`${Styles.loading} d-flex justify-content-center align-items-center`}>
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
    )}
  </>
);
    }
