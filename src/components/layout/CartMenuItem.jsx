import "../../styles/cartmenuitem.scss";
import { FiShoppingCart } from "react-icons/fi";

const CartMenuItem = () => {
    return (
        <div className="cart-menu-item">
            <div className="items-in-cart">1</div>
            <FiShoppingCart id="cart" />
        </div>
    )
}

export default CartMenuItem