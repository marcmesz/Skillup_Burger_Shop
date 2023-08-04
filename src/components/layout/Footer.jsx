import "../../styles/footer.scss";

import React from "react";
import { AiFillInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <main className="container-xxl p-0">
                <div className="footer-content d-flex justify-content-between">
                    <div className="footer-content__left d-flex flex-column">
                        <h2 className="my-3 mt-0">Burger Shop</h2>
                        <p className="my-3">We are trying to give you the best taste possible.</p>
                        <p className="my-3"><em>We give attention to genuine feedback.</em></p>
                    </div>
                    <aside className="d-flex flex-column align-items-center">
                        <h4>Follow Us</h4>
                        <p>
                            <a href="https://www.youtube.com/marcmesz" target="_blank">
                                <AiFillYoutube />
                            </a>
                            <a href="https://www.instagram.com/marcmesz" target="_blank">
                                <AiFillInstagram />
                            </a>
                            <a href="https://www.github.com/marcmesz" target="_blank">
                                <AiFillGithub />
                            </a>
                        </p>
                    </aside>
                </div>
                <div className="copy-text d-flex justify-content-between mt-5">
                    <strong>&copy; 2023 All rights reserved @burgershop</strong>
                    <p className="mx-2">Made by Mészöly Márton</p>
                </div>
            </main>
        </footer>
    )
}

export default Footer