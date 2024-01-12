import React, { useContext, useState } from 'react'
import Styles from "./Address.module.css"
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext'
import { useParams } from 'react-router-dom'
import * as Yup from "yup";

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

let phoneRegex =
/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const  validationSchema = Yup.object({
 details: Yup.string()
    .min(3, "Address mimimum lenght is 3")
    .required("Address is required"),
    phone: Yup.string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Phone number is required"),
    city: Yup.string()
    .min(3, "City mimimum lenght is 3")
    .required("City is required"),
})


  const formik = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:""
    }, validationSchema,
    onSubmit:handleAddressSubmit
    
  })
 
  return <>
 <div className="container my-5">
<form onSubmit={formik.handleSubmit}>
<label htmlFor="details">Address: </label>
<input type="text" className="form-control mb-2" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.touched.details && formik.errors.details ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.details}
            </div>
          ) : null}
<label htmlFor="phone">Phone: </label>
<input type="tel" className="form-control mb-2" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.touched.phone && formik.errors.phone ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.phone}
            </div>
          ) : null}
<label htmlFor="city">City: </label>
<input type="text" className="form-control mb-2" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.touched.city && formik.errors.city? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.city}
            </div>
          ) : null}
<button disabled={isLoading || !(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Pay Now</button>
</form>
 </div>
 </>
}
