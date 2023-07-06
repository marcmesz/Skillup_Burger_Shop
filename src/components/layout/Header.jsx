import "../../styles/header.scss";
import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";
import DropdownMenu from './DropdownMenu';

const Header = ({ isAuthenticated = false }) => {
    return (
        <nav className="container-xxl">
            <motion.div initial={{ x: "-100%" }} whileInView={{ x: 0 }}>
                <Link to="/" id="logo-with-text">
                    <IoFastFoodOutline />
                    <div className="logo-text">
                        <span>Burger</span>
                        <span>Shop</span>
                    </div>
                </Link>
            </motion.div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
                <Link to="/cart">
                    <FiShoppingCart />
                </Link>
                <DropdownMenu />
            </div>
        </nav>
    )
}

export default Header