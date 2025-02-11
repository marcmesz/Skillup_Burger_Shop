import "../../styles/header.scss";
import React, { useRef } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DropdownMenu from './DropdownMenu';
import CartMenuItem from "./CartMenuItem";
import { scrollToTop } from "../../functions/scrollToTop";
import MobileMenuIcon from "./MobileMenuIcon";

const Header = () => {
    const menuRef = useRef()
    const location = useLocation()
    const active = location.pathname.slice(1) === "" ? "home" : location.pathname.slice(1)

    const handleNavOpen = (e) => {
        window.innerWidth <= 890 && menuRef.current.classList.toggle("open")
        e !== "noScroll" && scrollToTop()
    }

    return (
        <div className="sticky-top bg-white shadow">
            <nav className="container-xxl" ref={menuRef}>
                <motion.div className="logo-container" initial={{ x: "-100%" }} whileInView={{ x: 0 }}>
                    <Link to="/" id="logo-with-text" onClick={() => scrollToTop()}>
                        <IoFastFoodOutline />
                        <div className="logo-text">
                            <span>Burger</span>
                            <span>Shop</span>
                        </div>
                    </Link>
                </motion.div>
                <MobileMenuIcon handleNavOpen={handleNavOpen} />
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
                    <DropdownMenu handleNavOpen={handleNavOpen} />
                </div>
            </nav>
        </div>
    )
}

export default Header