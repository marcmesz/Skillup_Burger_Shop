import "../../styles/cart.scss";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartEmpty = () => {
    return (
        <article className="cart-empty d-flex flex-column align-items-center">
            <FiShoppingCart />
            <h3 className="text-center m-5">Your cart is empty.</h3>
            <p><Link to="/" className="btn btn-lg btn-outline-primary">Go back to explore the menu</Link></p>
        </article>
    )
}

export default CartEmpty