import React, { useContext, useEffect, useState } from "react";
import Styles from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Vortex } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getLoggedUserCart,
    removeCartItem,
    updateProductQuantity,
    clearUserCart,
    setNumOfCartItems,
  } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getCart() {
    setIsLoading(true);
    console.log("loading");
    const {data} = await getLoggedUserCart();
   if (!data){
    setNumOfCartItems(0)
   }
    setCartDetails(data);
    console.log("done");
    setIsLoading(false);
  }

  useEffect(() => {
    getCart();
  }, []);

  async function removeItem(productId) {
    setIsLoading(true);
    const { data } = await removeCartItem(productId);
    console.log(data);
    setCartDetails(data);
    setNumOfCartItems(data.numOfCartItems);
    setIsLoading(false);
  }

  async function updateQuantity(productId, count) {
    setIsLoading(true);
    const { data } = await updateProductQuantity(productId, count);
    console.log(data);
    setCartDetails(data);
    setNumOfCartItems(data.numOfCartItems);
    setIsLoading(false);
  }

  async function clearCart() {
    setIsLoading(true);
    const { data } = await clearUserCart();
    console.log(data);
    setIsLoading(false);
    if (data.message == "success") {
      setCartDetails(null);
      setNumOfCartItems(0);
    }
  }

  // const queryClient= useQueryClient()
  //   const { isLoading, isError, data, isFetching } = useQuery(
  //     "loggedUserCart",
  //     getLoggedUserCart
  //   );
  //   const {
  //     mutate: removeCartItemMutation,
  //     isLoading: isMutating,
  //     isError: isMutationError,
  //     data: mutateData,
  //   } =   useMutation('removeCartItem', removeCartItem, {
  //     onSuccess: () => {
  //       // Invalidate and refetch the 'loggedUserCart' query after successful removal
  //       queryClient.invalidateQueries('loggedUserCart')}})

  //       const {
  //         mutate: updateProductQuantityMutation,
  //         isLoading: isMutating,
  //         isError: isMutationError,
  //         data: mutateData,
  //       } =   useMutation('removeCartItem', removeCartItem, {
  //         onSuccess: () => {
  //           // Invalidate and refetch the 'loggedUserCart' query after successful removal
  //           queryClient.invalidateQueries('loggedUserCart')}})

  // const cartDetails = data?.data
  // console.log(cartDetails);
  // const cartItems= data?.data.data.products

  return (
    <>
      {console.log(cartDetails)}
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
                  className="text-white btn btn-danger"
                  onClick={() => clearCart()}
                >
                  Clear your Cart
                </button>
              </div>
            </div>
            {cartDetails?.data.products.map((item) => (
              <div
                key={item.product._id}
                className="row border-bottom py-2 px-2"
              >
                <div className="col-md-1">
                  <img className="img-fluid" src={item.product.imageCover} />
                </div>
                <div className="col-md-11">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="h6">
                        {item.product.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <h6 className="text-main">price: {item.price} EGP</h6>
                    </div>
                    <div>
                      <button
                        className="btn brdr-main p-1"
                        onClick={() =>
                          updateQuantity(item.product._id, item.count + 1)
                        }
                      >
                        +
                      </button>
                      <span className="mx-2">{item.count}</span>
                      <button
                        className="btn brdr-main p-1"
                        onClick={() =>
                          item.count > 1
                            ? updateQuantity(item.product._id, item.count - 1)
                            : ""
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="btn p-0"
                  >
                    <i className="fas fa-trash-can text-danger font-sm"></i>{" "}
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="d-flex align-content-center justify-content-center">
              <Link
                to={`/Address/${cartDetails.data._id}`}
                className="text-white btn bg-main mx-auto mt-3 text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
            {/* <button
              className="text-white mx-auto btn bg-main mt-2"
              onClick={() => clearCart()}
            >
              Cash on Delivery
            </button> */}
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
