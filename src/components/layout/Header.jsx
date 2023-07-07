import "../../styles/header.scss";
import React, { useRef } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { FaHamburger } from "react-icons/fa";
import { motion } from "framer-motion";
import DropdownMenu from './DropdownMenu';
import { useState } from "react";

const Header = ({ isAuthenticated = false }) => {
    const menuRef = useRef()
    const [active, setActive] = useState("home")

    const handleNavOpen = (e) => {
        window.innerWidth <= 864 && menuRef.current.classList.toggle("open")
        if (e.target.id) {
            setActive(e.target.id)
            scrollToTop()
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <div className="sticky-top bg-white shadow">
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
                    <Link
                        id="home"
                        className={active === "home" ? "active" : ""}
                        to="/"
                        onClick={(e) => handleNavOpen(e)}
                    >
                        Home
                    </Link>
                    <Link
                        id="contact"
                        className={active === "contact" ? "active" : ""}
                        to="/contact"
                        onClick={(e) => handleNavOpen(e)}
                    >
                        Contact
                    </Link>
                    <Link
                        id="about"
                        className={active === "about" ? "active" : ""}
                        to="/about"
                        onClick={(e) => handleNavOpen(e)}
                    >
                        About
                    </Link>
                    <Link
                        to="/cart"
                        className={active === "cart" ? "active" : ""}
                        onClick={(e) => handleNavOpen(e)}
                    >
                        <FiShoppingCart id="cart" />
                    </Link>
                    <DropdownMenu handleNavOpen={handleNavOpen} />
                </div>
            </nav>
        </div>
    )
}

export default Header