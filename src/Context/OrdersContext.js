import axios from 'axios'
import React, { createContext } from 'react'

// This context is not being used in the application yet!!

export const OrdersContext = createContext()

export default function OrdersContextProvider(props) {
function getAllUserOrders(userId){
return axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userId}`) .then((response)=>response).catch((response)=>response)
}

<OrdersContext.Provider value= {{getAllUserOrders}}>
{props.children}
</OrdersContext.Provider>
}
