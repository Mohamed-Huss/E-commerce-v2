import React, { useContext } from 'react'
import Styles from "./CartItem.module.css"
import { cartContext } from '../../Context/CartContext'
import { useMutation } from 'react-query'

export default function CartItem({cartFunctions}) {
  const {

    removeCartItem,
    updateProductQuantity,
    setNumOfCartItems,
  } = useContext(cartContext)
  const {setCartDetails, item } = {...cartFunctions}
 

  async function removeItem(productId) {
    return await removeCartItem(productId);
   }


   async function updateQuantity({Id , count}) {
    return await updateProductQuantity(Id, count);
  }

   const {
    mutateAsync: removeCartItemMutation , isLoading: removeIsLoading
  } =   useMutation( removeItem, {
    onSuccess: ({data}) => {
      setCartDetails(data);
      setNumOfCartItems(data.numOfCartItems);}})


      const {
        mutateAsync: updateProductQuantityMutation , isLoading: updateIsLoading
      } =   useMutation( updateQuantity ,{onSuccess: ({data}) => { setCartDetails(data);
        setNumOfCartItems(data.numOfCartItems); }})  

 return <>
              <div
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
                      <button disabled={updateIsLoading}
                        className="btn brdr-main p-1"
                        onClick={() =>
                          updateProductQuantityMutation({Id:item.product._id, count:item.count+1})
                        }
                      >
                        +
                      </button>
                      <span className="mx-2">{item.count}</span>
                      <button disabled={updateIsLoading}
                        className="btn brdr-main p-1"
                        onClick={() =>
                          item.count > 1
                            ? updateProductQuantityMutation({Id:item.product._id, count:item.count-1})
                            : ""
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <button disabled={removeIsLoading}
                    onClick={() => removeCartItemMutation(item.product._id)}
                    className="btn p-0"
                  >
                    <i className="fas fa-trash-can text-danger font-sm"></i>{" "}
                    Remove
                  </button>
                </div>
              </div>
 </>
}
