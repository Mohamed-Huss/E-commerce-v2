import React, { useContext } from "react";
import Styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  let Navigate = useNavigate();
  const { userToken, setUserToken } = useContext(UserContext);
  const {numOfCartItems} = useContext(cartContext);
  console.log(numOfCartItems);
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    Navigate("/Login");
  }

  
  return (
    <>{}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Fresh Cart Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
           
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    categories
                  </Link>
                </li>
                {/* <li className="nav-item">
                <Link className="nav-link" to="/brands">
                  Brands
                </Link> 
              </li>*/}
                {userToken ? ( <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>) : null}
              </ul>
            
            {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2 "></i>
              </li>
            </ul> */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
           <Link to="cart"> <li className="nav-item position-relative me-2 text-black">
              <i className="fa-solid fa-shopping-cart fs-3"></i>
              {userToken? <div className="badge position-absolute text-white bottom-25 start-100 translate-middle bg-main">{numOfCartItems}</div>: ""}
              </li></Link>
              <li className="nav-item">
                <i className="fab fa-facebook mx-2 cursor-pointer fs-5"></i></li>
                <li className="nav-item">
                <i className="fab fa-twitter mx-2 cursor-pointer fs-5"></i></li>
                <li className="nav-item">
                <i className="fab fa-instagram mx-2 cursor-pointer fs-5"></i></li>
                <li className="nav-item">
                <i className="fab fa-tiktok mx-2 cursor-pointer fs-5"></i></li>
                <li className="nav-item">
                <i className="fab fa-youtube mx-2 cursor-pointer fs-5"></i></li>
              {/* d-flex align-items-center */}
              {userToken ? (
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={() => logOut()}
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    {" "}
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
