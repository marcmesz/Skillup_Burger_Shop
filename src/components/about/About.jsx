import "../../styles/pagecontent.scss";
import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import { RiFindReplaceLine } from "react-icons/ri";
import me from "../../assets/skj.jpg";

const About = () => {

    return (
        <section className="page-content">
            <h1 className="page-title">About Us</h1>
            <main>
                <article>
                    <h4>Burger Shop</h4>
                    <p>
                        This is Burger Shop. The place for most tasty burgers on the
                        enitre earth.
                    </p>
                    <p>
                        Explore the various type of food and burgers. Click below to see the
                        menu.
                    </p>
                    <Link to="/#menu">
                        <RiFindReplaceLine />
                    </Link>
                </article>
                <div>
                    <h2>Founder</h2>
                    <article>
                        <div className="d-flex flex-column align-items-center">
                            <img src={me} alt="Founder" />
                            <h3>Nelson</h3>
                        </div>
                        <p>
                            I am Nelson, the founder of Burger Shop. Affiliated to
                            God Taste...
                        </p>
                    </article>
                </div>
            </main>
        </section>
    )
}

export default About