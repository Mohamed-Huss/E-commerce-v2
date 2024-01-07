import React from "react";
import Styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import OnlineStatus from "../OnlineStatus/OnlineStatus";
import { cartContext } from "../../Context/CartContext";

export default function Layout() {

const {setUserToken} = useContext(UserContext)

useEffect(()=>{
if (localStorage.getItem("userToken")){
  setUserToken(localStorage.getItem("userToken"))}
},[])

  return (
    <>
      <Navbar />
      <div className={`${Styles.container} container`}>
      <Outlet />
      </div>
      <Footer/>

      <OnlineStatus/>
    </>
  );
}
