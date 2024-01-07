import React, { useContext, useState } from 'react'
import Styles from "./Address.module.css"
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext'
import { useParams } from 'react-router-dom'


export default function Address() {
const params = useParams()
const cartId = params.id
let {onlinePayment} = useContext(cartContext)
const [isLoading, setIsLoading] = useState(false);
const pathName = window.location.pathname.split("/", 2)
const baseUrl =  window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
const url  = `${baseUrl}/${pathName[1]}/%23`
console.log(url)
console.log(pathName)
 
async function handleAddressSubmit(values){
console.log(cartId)
setIsLoading(true)
 let response = await onlinePayment (cartId, url , values);
 setIsLoading(false)
console.log(response)
console.log(response.data.session.url)
window.location.href = response.data.session.url
}
  let formik = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:""
    }, 
    onSubmit:handleAddressSubmit
  })
  return <>
 <div className="container my-5">
<form onSubmit={formik.handleSubmit}>
<label htmlFor="details">Address: </label>
<input type="text" className="form-control mb-2" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />

<label htmlFor="phone">Phone: </label>
<input type="tel" className="form-control mb-2" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />

<label htmlFor="city">City: </label>
<input type="text" className="form-control mb-2" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />

<button disabled={isLoading} type='submit' className='btn bg-main text-white'>Pay Now</button>
</form>
 </div>
 </>
}
