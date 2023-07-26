import "../../styles/table.scss";
import "../../styles/cart.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { cartActions } from "../../store/cartSlice";
import { scrollToTop } from "../../functions/scrollToTop";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const MyOrders = () => {
  const [message, setMessage] = useState(false)
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const user = userState.users.find(user => user.email === userState.isAuthenticated.email)
  const orderCompleted = userState.process.type === "order_completed"
  const orders = user.orders

  useEffect(() => {
    if (orderCompleted) {
      setMessage(true)
      scrollToTop()
      dispatch(userActions.setCurrentOrderEmpty())
      dispatch(userActions.handleProcess())
      dispatch(cartActions.setCartEmpty())
    }
  }, [orderCompleted, user, dispatch])

  return (
    <>
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
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order.orderId}>
                  <td>#{order.orderId}</td>
                  <td>{order.orderCompleted ? "Completed" : "Processing"}</td>
                  <td>{order.totalItems}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>COD</td>
                  <td>
                    <Link to={`/order/${order.orderId}`}>
                      <AiOutlineEye style={{ fontSize: "1.5em" }} />
                    </Link>
                  </td>
                </tr>
              )) :
                <tr>
                  <td colSpan={6} className="cart-empty">
                    <h6 className="mt-5">You don't have any orders yet.</h6>
                    <p>
                      <Link to="/" className="btn btn-lg btn-outline-primary my-4">
                        Go back to explore the menu
                      </Link>
                    </p>
                  </td>
                </tr>}
            </tbody>
          </table>
        </main>
      </section>

      {message &&
        <MDBModal show={message} setShow={setMessage} tabIndex='-1' className="d-flex align-items-center">
          <MDBModalDialog className="w-50">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Order completed <AiOutlineCheck style={{ color: "green" }} /></MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setMessage(false)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody className="py-5 text-center">
                <h4 className="mt-2">Thank you for your order!</h4>
                <p className="mt-4">Your order will be shipped soon.</p>
                <p>You can see the details of your order by clicking the <AiOutlineEye style={{ color: "red" }} /> icon.</p>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn onClick={() => setMessage(false)}>OK</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>}
    </>
  );
};

export default MyOrders;
