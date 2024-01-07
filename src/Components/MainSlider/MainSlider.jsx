import React from "react";
import Styles from "./MainSlider.module.css";
import Slider from "react-slick";
import slider1 from "../../Assets/images/slider-image-1.jpeg";
import slider2 from "../../Assets/images/slider-image-2.jpeg";
import slider3 from "../../Assets/images/slider-image-3.jpeg";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false
  };
  return (
    <div className="main-slider my-4">
      <div className="row gx-0">
        <div className="col-md-9">
          <Slider {...settings}>
            <img className="w-100" height={400} src={slider1} />
            <img className="w-100" height={400} src={slider2} />
            <img className="w-100" height={400} src={slider3} />
          </Slider>{" "}
        </div>
        <div className="col-md-3">
          <img className="w-100" height={200} src={slider1} />
          <img className="w-100" height={200} src={slider2} />
        </div>
      </div>
    </div>
  );
}
