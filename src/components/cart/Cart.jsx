import "../../styles/cart.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { cartActions } from "../../store/cartSlice";
import CartEmpty from "./CartEmpty";
import { userActions } from "../../store/userSlice";
import { useEffect } from "react";
import ShippingDetails from "./ShippingDetails";

const Cart = ({ confirmOrder }) => {
  const dispatch = useDispatch()
  const checkout = useSelector(state => state.user.process.checkout)
  const orderedItems = useSelector(state => state.cart.items)
  const cartEmpty = orderedItems.length === 0
  const { subTotal, taxTotal, totalAmount, shipping } = useSelector(state => state.cart)
  const currentOrder = useSelector(state => state.user.currentOrder)

  const incrementHandler = (order) => {
    dispatch(cartActions.addItemToCart(order))
  }

  const decrementHandler = (order) => {
    dispatch(cartActions.removeOneItemFromCart(order))
  }

  const handleCheckout = () => {
    !checkout && dispatch(userActions.handleProcess({ type: "", checkout: true }))
  }

  const handleConfirmOrder = () => {
    dispatch(userActions.completeOrder({ ...currentOrder }))
  }

  useEffect(() => {
    if (cartEmpty && checkout) {
      dispatch(userActions.handleProcess({ type: "", checkout: false }))
    }
  }, [cartEmpty, checkout, dispatch])

  return (
    <section className="cart">
      <h1 className="page-title">{confirmOrder ? "Confirm order" : "Cart"}</h1>
      <main>
        {confirmOrder && currentOrder && <ShippingDetails currentOrder={currentOrder} />}
        {!cartEmpty && orderedItems.map(order => {
          return (
            <CartItem
              key={order.id}
              title={order.title}
              img={order.burgerSrc}
              value={order.amount}
              price={order.price}
              confirmOrder={confirmOrder}
              increment={() => incrementHandler(order)}
              decrement={() => decrementHandler(order)}
            />
          )
        })}

        {!cartEmpty ?
          <article className="d-flex flex-column">
            <div>
              <h4>Sub Total</h4>
              <p>₹{subTotal}</p>
            </div>
            <div>
              <h4>Tax</h4>
              <p>₹{taxTotal}</p>
            </div>
            <div>
              <h4>Shipping Charges</h4>
              <p>₹{shipping}</p>
            </div>{" "}
            <hr />
            <div>
              <h4>Total</h4>
              <p className="total-amount">₹{totalAmount}</p>
            </div>
            <hr />
            {confirmOrder ?
              <button className="link w-100 border-0 mt-4" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
              :
              <Link to="/shipping" className="link" onClick={handleCheckout}>
                Checkout
              </Link>
            }
          </article>
          : <CartEmpty />
        }
      </main>
    </section >
  )
}

export default Cart
