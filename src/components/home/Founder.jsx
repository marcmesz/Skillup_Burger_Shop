import "../../styles/founder.scss";
import React from "react";
import { motion } from "framer-motion";
import me from "../../assets/skj.jpg";

const Founder = () => {
  const options = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    whileInView: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <section className="founder">
      <motion.div {...options}>
        <img src={me} alt="Founder" />
        <h3>Nelson</h3>
        <em>
          Hey, Everyone I am Nelson, the founder of Burger Shop.
          <br />
          Our aim is to create the most tasty burger on planet.
        </em>
      </motion.div>
    </section>
  );
};

export default Founder;
