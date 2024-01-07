import React, { useEffect, useState } from "react";
import Styles from "./Home.module.css";
import Products from "../Products/Products";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";



export default function Home() {
  return (
    <>
      {console.log("Home component rendered")}
      <div className="container">
        <MainSlider />
        <CategorySlider />
        <Products />
      </div>
    </>
  );
}
