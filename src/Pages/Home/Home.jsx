import React, { useEffect, useState } from "react";
import Styles from "./Home.module.css";
import Products from "../Products/Products";
import MainSlider from "../../Components/MainSlider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";



export default function Home() {
  return (
    <>
      <div className="container">
        <MainSlider />
        <CategorySlider />
        <Products />
      </div>
    </>
  );
}
