import "../../styles/cart.scss";
import React from "react";
import { Link } from "react-router-dom";
import burger1 from "../../assets/burger1.png";
import burger2 from "../../assets/burger2.png";
import burger3 from "../../assets/burger3.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  const orderedItems = useSelector(state => state.cart.items)

  const incrementHandler = (id) => {
    console.log("incrementing " + id)
  }
  
  const decrementHandler = (id) => {
  
    console.log("decrementing " + id)
  }


  useEffect(() => {
    console.log(orderedItems)
  })

  return (
    <section className="cart">
      <h1 className="page-title">Cart</h1>
      <main>
        {orderedItems.length > 0 ? orderedItems.map(order => {
          return (
            <CartItem
              key={order.id}
              title={order.title}
              img={burger1}
              value={order.amount}
              increment={() => incrementHandler(order.id)}
              decrement={() => decrementHandler(order.id)}
            />
          )
        }) : <h3 className="text-center m-5">Your cart is empty.</h3>}
        {/* <CartItem
          title={"Cheese Burger"}
          img={burger1}
          value={0}
          increment={() => increment(1)}
          decrement={() => decrement(1)}
        />
        <CartItem
          title={"Veg Cheese Burger"}
          img={burger2}
          value={0}
          increment={() => increment(2)}
          decrement={() => decrement(2)}
        />
        <CartItem
          title={"Cheese Burger with French Fries"}
          img={burger3}
          value={0}
          increment={() => increment(3)}
          decrement={() => decrement(3)}
        /> */}

        <article>
          <div>
            <h4>Sub Total</h4>
            <p>₹{2000}</p>
          </div>
          <div>
            <h4>Tax</h4>
            <p>₹{2000 * 0.18}</p>
          </div>
          <div>
            <h4>Shipping Charges</h4>
            <p>₹{200}</p>
          </div>{" "}
          <hr />
          <div>
            <h4>Total</h4>
            <p className="total-amount">₹{2000 + 2000 * 0.18 + 200}</p>
          </div>
          <hr />
          <Link to="/shipping">Checkout</Link>
        </article>
      </main>
    </section>
  )
}

export default Cart
