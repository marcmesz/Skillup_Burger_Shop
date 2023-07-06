import "../../styles/header.scss";
import React, { useRef } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { FaHamburger } from "react-icons/fa";
import { motion } from "framer-motion";
import DropdownMenu from './DropdownMenu';

const Header = ({ isAuthenticated = false }) => {
    const menuRef = useRef()

    const handleNavOpen = () => {
        menuRef.current.classList.toggle("open")
    }

    return (
        <nav className="container-xxl" ref={menuRef}>
            <motion.div initial={{ x: "-100%" }} whileInView={{ x: 0 }}>
                <Link to="/" id="logo-with-text">
                    <IoFastFoodOutline />
                    <div className="logo-text">
                        <span>Burger</span>
                        <span>Shop</span>
                    </div>
                </Link>
            </motion.div>
            <FaHamburger className="mobile-icon" onClick={handleNavOpen} />
            <div className="menu-items">
                <Link to="/" onClick={handleNavOpen}>Home</Link>
                <Link to="/contact" onClick={handleNavOpen}>Contact</Link>
                <Link to="/about" onClick={handleNavOpen}>About</Link>
                <Link to="/cart" onClick={handleNavOpen}>
                    <FiShoppingCart />
                </Link>
                <DropdownMenu handleNavOpen={handleNavOpen} />
            </div>
        </nav>
    )
}

export default Header