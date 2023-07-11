import "../../styles/cart.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CartItem from "./CartItem";
import { cartActions } from "../../store/cartSlice";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const dispatch = useDispatch()
  const orderedItems = useSelector(state => state.cart.items)
  const cartEmpty = orderedItems.length === 0
  const { subTotal, taxTotal, totalAmount, shipping } = useSelector(state => state.cart)

  const incrementHandler = (order) => {
    dispatch(cartActions.addItemToCart(order))
  }

  const decrementHandler = (order) => {
    dispatch(cartActions.removeOneItemFromCart(order))
  }

  return (
    <section className="cart">
      <h1 className="page-title">Cart</h1>
      <main>
        {!cartEmpty && orderedItems.map(order => {
          return (
            <CartItem
              key={order.id}
              title={order.title}
              img={order.burgerSrc}
              value={order.amount}
              increment={() => incrementHandler(order)}
              decrement={() => decrementHandler(order)}
            />
          )
        })}

        {!cartEmpty ?
          <article>
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
            <Link to="/shipping">Checkout</Link>
          </article>
          : <CartEmpty />}


      </main>
    </section>
  )
}

export default Cart
