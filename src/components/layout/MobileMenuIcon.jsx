import { FaHamburger } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../styles/cartmenuitem.scss";

const MobileMenuIcon = ({ handleNavOpen }) => {
    const totalItems = useSelector(state => state.cart.totalItems)

    return (
        <>
            {totalItems > 0 && <div className="items-in-cart mobile-in-cart" id="cart">{totalItems}</div>}
            <FaHamburger className="mobile-icon" onClick={() => handleNavOpen("noScroll")} />
        </>
    )
}

export default MobileMenuIcon