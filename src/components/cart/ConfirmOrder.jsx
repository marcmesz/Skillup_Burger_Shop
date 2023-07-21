import Cart from "./Cart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
    const navigate = useNavigate()
    const orderCompleted = useSelector(state => state.user.process.type === "order_completed")

    useEffect(() => {
        if (orderCompleted) {
            navigate("/my-orders")
        }
    }, [orderCompleted, navigate])

    return (
        <Cart confirmOrder={true} />
    )
}

export default ConfirmOrder