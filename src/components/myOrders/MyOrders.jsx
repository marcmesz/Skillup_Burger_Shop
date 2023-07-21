import "../../styles/table.scss";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { cartActions } from "../../store/cartSlice";

const MyOrders = () => {
  const dispatch = useDispatch()
  const arr = [1, 2, 3, 4]
  const userState = useSelector(state => state.user)
  const user = userState.users.find(user => user.email === userState.isAuthenticated.email)
  const orderCompleted = userState.process.type === "order_completed"

  useEffect(() => {
    if (orderCompleted) {
      console.log("vége.....")
      dispatch(userActions.setCurrentOrderEmpty())
      dispatch(cartActions.setCartEmpty())
    }
  }, [orderCompleted, dispatch])

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
            {arr.map((i) => (
              <tr key={i}>
                <td>#sdkfsdfdsf</td>
                <td>Processing</td>
                <td>23</td>
                <td>₹{2132}</td>
                <td>COD</td>
                <td>
                  <Link to={`/order/${"asdsds"}`}>
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
