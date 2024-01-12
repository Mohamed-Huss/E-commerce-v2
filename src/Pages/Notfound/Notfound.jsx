import React from 'react'
import Styles from "./Notfound.module.css"
import notFound from "../../Assets/images/error.svg"
export default function Notfound() {
  return <div className='d-flex justify-content-center'>
<img src={notFound} alt="page not found" className='w-75'/>
</div>
}
