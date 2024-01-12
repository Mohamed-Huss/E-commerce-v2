import React, { useContext, useState } from "react";
import Styles from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Vortex } from "react-loader-spinner";
import { Link } from "react-router-dom";
import CartItem from "../../Components/CartItem/CartItem";
import { queryClient } from "../..";

export default function Cart() {
  const {
    getLoggedUserCart,
    clearUserCart,
    setNumOfCartItems,
  } = useContext(cartContext);

  const initialData = queryClient.getQueryData("loggedUserCart");

  // Initialize the state with the initial data
  const [cartDetails, setCartDetails] = useState(initialData?.data);

  function getCart() {
    return getLoggedUserCart();
  }

  function clearCart() {
    return clearUserCart();
  }

  const { isLoading, isError } = useQuery(
    "loggedUserCart",
    getCart,
    {
      onSuccess: (queryResult) => {
        const { data } = queryResult;
        if (!data) {
          setNumOfCartItems(0);
        }
        setCartDetails(data);
      },
    }
  );


  const {
    mutateAsync: clearCartMutation,
    isLoading: clearIsLoading,
  } = useMutation(clearCart, {
    onSuccess: (data) => {
      if (data.data.message === "success") {
        setCartDetails(null);
        setNumOfCartItems(0);
      }
    },
  });

  return (
    <>
      {!isLoading ? (
        cartDetails == null || cartDetails.numOfCartItems === 0 ? (
          <div className="w-75 mx-auto my-2 p-3 bg-main-light">
            <h3 className="text-main">Your shopping cart is empty</h3>
          </div>
        ) : (
          <div className="w-75 mx-auto my-2 p-3 bg-main-light">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>Shopping Cart</h3>
                <h4 className="h6 text-main fw-bolder">
                  Cart Items: {cartDetails?.numOfCartItems}
                </h4>
                <h4 className="h6 text-main fw-bolder">
                  Total Cart Price: {cartDetails?.data.totalCartPrice} EGP
                </h4>
              </div>
              <div>
                <button
                  disabled={clearIsLoading}
                  className="text-white btn btn-danger"
                  onClick={() => clearCartMutation()}
                >
                  Clear your Cart
                </button>
              </div>
            </div>
            {cartDetails?.data.products.map((item) => (
              <CartItem
                key={item.product._id}
                cartFunctions={{ setCartDetails, item }}
              />
            ))}
            <div className="d-flex align-content-center justify-content-center">
              <Link
                to={`/Address/${cartDetails.data._id}`}
                className="text-white btn bg-main mx-auto mt-3 text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )
      ) : (
        <div
          className={`${Styles.loading} d-flex justify-content-center align-items-center`}
        >
          <Vortex
            visible={true}
            height="150"
            width="150"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      )}
    </>
  );
}
