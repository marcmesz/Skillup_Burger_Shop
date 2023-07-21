import "../../styles/header.scss";
import React, { useRef } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { FaHamburger } from "react-icons/fa";
import { motion } from "framer-motion";
import DropdownMenu from './DropdownMenu';
import { useState } from "react";
import CartMenuItem from "./CartMenuItem";
import { useSelector } from "react-redux";
import { scrollToTop } from "../../functions/scrollToTop";

const Header = () => {
    const menuRef = useRef()
    const location = useLocation()
    const currentPage = location.pathname.slice(1) === "" ? "home" : location.pathname.slice(1)
    const [active, setActive] = useState(currentPage)
    const loggedIn = useSelector(state => state.user.isAuthenticated.isAuth)

    const handleNavOpen = (e) => {
        window.innerWidth <= 890 && menuRef.current.classList.toggle("open")
        setActive(e.target.id)
        scrollToTop()
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
                        id="about"
                        className={active === "about" ? "active" : ""}
                        to="/about"
                        onClick={(e) => handleNavOpen(e)}
                    >
                        About
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
                        id="cart"
                        to="/cart"
                        className={active === "cart" ? "active" : ""}
                        onClick={(e) => handleNavOpen(e)}
                    >
                        <CartMenuItem />
                    </Link>
                    {loggedIn ? <DropdownMenu handleNavOpen={handleNavOpen} /> :
                        <div className="btn-group">
                            <Link to="/login">
                                <button className="btn-lg btn-login d-flex align-items-center">
                                    <span className="ms-1">Sign in</span>
                                    <FiLogIn />
                                </button>
                            </Link>
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Header