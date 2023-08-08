import "../../styles/menu.scss";
import React from "react";
import MenuCard from "./MenuCard";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Menu = () => {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios
            .get("/data/burgers.json")
            .then(res => setMenu(res.data))
    }, [])

    return (
        <div className="bg-white">
            <h1 className="page-title">Menu</h1>
            <div id="menu"></div>
            <section id="menu-section" className="container-xxl">
                <div className="menu-grid">
                    {menu.length > 0 && menu.map((burger, index) => {
                        const delay = ((index + 2) / 10 + (index / 3)).toFixed(1)
                        return (
                            <MenuCard
                                key={burger.id}
                                id={burger.id}
                                alt={burger.title}
                                burgerSrc={burger.img}
                                price={burger.price}
                                title={burger.title}
                                delay={delay}
                            />
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default Menu