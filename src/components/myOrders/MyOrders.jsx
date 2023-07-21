import "../../styles/table.scss";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { cartActions } from "../../store/cartSlice";
import { scrollToTop } from "../../functions/scrollToTop";

const MyOrders = () => {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const user = userState.users.find(user => user.email === userState.isAuthenticated.email)
  const orderCompleted = userState.process.type === "order_completed"
  const orders = user.orders

  useEffect(() => {
    if (orderCompleted) {
      scrollToTop()
      dispatch(userActions.setCurrentOrderEmpty())
      dispatch(userActions.handleProcess())
      dispatch(cartActions.setCartEmpty())
    }
  }, [orderCompleted, user, dispatch])

  return (
    <section className="tableClass">
      <h1 className="page-title">My Orders</h1>
      <main>
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Status</th>
              <th>Item Qty</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>#{order.orderId}</td>
                <td>{order.orderCompleted ? "Completed" : "Processing"}</td>
                <td>{order.totalItems}</td>
                <td>₹{order.totalAmount}</td>
                <td>COD</td>
                <td>
                  <Link to={`/order/${order.orderId}`}>
                    <AiOutlineEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default MyOrders;
