
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'



export const cartContext = createContext()
export default function CartContextProvider(props) {
// const [cartId, setCartId] = useState(null)
const [numOfCartItems, setNumOfCartItems] = useState(null)

useEffect(()=>{
getCart()
},[])


let headers={
    token:localStorage.getItem('userToken')
}

function addToCart(productId)
{
   return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, {productId} , {headers}).then((response)=>response).catch((error)=>error)
}

function getLoggedUserCart(){
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`, {headers}).then((response)=>response).catch((error)=>error)
}

function removeCartItem(productId){
return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {headers}).then((response)=>response).catch((error)=>error)
}

function updateProductQuantity(productId, count){
return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {count} , {headers}).then((response)=>response).catch((error)=>error)
}


function clearUserCart(){
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/`, {headers}).then((response)=>response).catch((error)=>error)
    }

function onlinePayment(cartId , url , values){
 return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {shippingAddress: values} , {headers}).then((response)=>response).catch((error)=>error)
}   
async function getCart() {
let {data} = await getLoggedUserCart()
if (!data){
    setNumOfCartItems(0)
   }
   else{
setNumOfCartItems(data?.numOfCartItems)
}
}

return <cartContext.Provider value={{addToCart, getLoggedUserCart, removeCartItem, updateProductQuantity, clearUserCart, onlinePayment , numOfCartItems, getCart , setNumOfCartItems}}>
{props.children}
</cartContext.Provider>
}
  