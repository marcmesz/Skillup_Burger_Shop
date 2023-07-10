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
            <section id="menu" className="container-xxl">
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
                    {/* <MenuCard
                        itemNum={1}
                        burgerSrc={burger1}
                        price={200}
                        title="Cheese Burger"
                        handler={addToCartHandler}
                        delay={0.1}
                    />
                    <MenuCard
                        itemNum={2}
                        burgerSrc={burger2}
                        price={500}
                        title="Veg Cheese Burger"
                        delay={0.5}
                        handler={addToCartHandler}
                    />
                    <MenuCard
                        itemNum={3}
                        burgerSrc={burger3}
                        price={1800}
                        title="Cheese Burger with French Fries"
                        delay={0.8}
                        handler={addToCartHandler}
                    /> */}
                </div>
            </section>
        </div>
    )
}

export default Menu