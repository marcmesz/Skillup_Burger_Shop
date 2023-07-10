import { useSelector } from "react-redux";
import "../../styles/cartmenuitem.scss";
import { FiShoppingCart } from "react-icons/fi";

const CartMenuItem = () => {
    const totalItems = useSelector(state => state.cart.totalItems)
    return (
        <div className="cart-menu-item">
            {totalItems > 0 && <div className="items-in-cart">{totalItems}</div>}
            <FiShoppingCart id="cart" />
        </div>
    )
}

export default CartMenuItem