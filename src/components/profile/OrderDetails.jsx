import { useSelector } from "react-redux";
import "../../styles/orderDetails.scss";
import "../../styles/cart.scss";
import React from "react";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
    const { pathname } = useLocation()
    const users = useSelector(state => state.user.users)
    const userEmail = useSelector(state => state.user.isAuthenticated.email)
    const user = users.find(user => user.email === userEmail)
    const orderId = pathname.split("/")[pathname.split("/").length - 1]
    const currentOrder = user.orders.find(order => order.orderId === orderId)
    const shippingAddress = `${user.address.streetHouseNo}, ${user.address.city}, ${user.address.state.label} ${user.address.pincode}, ${user.address.country.label}`
    const orderDate = currentOrder && new Date(currentOrder.orderCompleted).toLocaleString()

    return (
        <section className="orderDetails">
            <h1 className="page-title">Order Details</h1>
            <main className="page-content">
                {
                    currentOrder ?
                        <>
                            <div>
                                <h4>Shipping</h4>
                                <p>
                                    <strong>Address: </strong>
                                    {shippingAddress}
                                </p>
                            </div>
                            <div>
                                <h4>Contact</h4>
                                <p>
                                    <strong>Name: </strong>
                                    {user.name}
                                </p>
                                <p>
                                    <strong>Phone: </strong>
                                    {user.address.phone}
                                </p>
                            </div>
                            <div>
                                <h4>Status</h4>
                                <p>
                                    <strong>Order Status: </strong>
                                    {currentOrder.orderCompleted ? "Completed" : "Processing"}
                                </p>
                                <p>
                                    <strong>Placed At: </strong>
                                    {orderDate}
                                </p>
                                <p>
                                    <strong>Delivered At: </strong>
                                    {orderDate}
                                </p>
                            </div>
                            <div>
                                <h4>Payment</h4>
                                <p>
                                    <strong>Payment Method: </strong>
                                    {"COD"}
                                </p>
                                <p>
                                    <strong>Payment Reference: </strong> #{currentOrder.orderId}
                                </p>
                                <p>
                                    <strong>Paid At: </strong>
                                    {orderDate}
                                </p>
                            </div>
                            <div>
                                <h4>Amount</h4>
                                <p>
                                    <strong>Items Total: </strong> ₹{currentOrder.subTotal}
                                </p>
                                <p>
                                    <strong>Shipping Charges: </strong> ₹{currentOrder.shipping}
                                </p>
                                <p>
                                    <strong>Tax: </strong> ₹{currentOrder.taxTotal}
                                </p>
                                <p>
                                    <strong>Total Amount: ₹{currentOrder.totalAmount} </strong>
                                </p>
                            </div>
                            <article>
                                <h2>Ordered Items</h2>
                                {currentOrder.items.map((item, index) => (
                                    <div key={index}>
                                        <h4>{item.title}</h4>
                                        <div className="price">
                                            {item.amount} x ₹{item.price}
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <h4 style={{ fontWeight: "bold" }}>Sub Total</h4>
                                    <div style={{ fontWeight: "bold" }}>
                                        ₹{currentOrder.subTotal}
                                    </div>
                                </div>
                            </article>
                        </>
                        :
                        <>
                            <h4 className="text-center">Order ID not found!</h4>
                            <p className="text-center">Please check your order ID to get your receipt correctly.</p>
                        </>
                }
            </main>
        </section>
    )
}

export default OrderDetails