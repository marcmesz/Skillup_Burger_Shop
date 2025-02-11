import "../../styles/menuCard.scss";
import { motion } from "framer-motion";
import Popup from 'reactjs-popup';
import { useRef } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs"
import { useDispatch } from 'react-redux'
import { cartActions } from "../../store/cartSlice";

const MenuCard = (props) => {
  const popupRef = useRef()
  const dispatch = useDispatch()

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemToCart(item))
    closePopup()
  }

  const closePopup = () => {
    setTimeout(() => popupRef.current?.close(), 2500)
  }


  return (
    <motion.div
      className="menuCard"
      initial={{
        x: "-100%",
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        delay: props.delay
      }}
    >
      <main>
        <img src={props.burgerSrc} alt={props.title} />
        <h5>₹{props.price}</h5>
        <p>{props.title}</p>
        <Popup ref={popupRef} onOpen={() => addToCartHandler(props)} trigger={<button>Add to Cart</button>}>
          <div className="added-to-cart">
            <BsFillCheckCircleFill />
            <span className="ms-2">Added to cart!</span>
          </div>
        </Popup>
      </main>
    </motion.div>
  );
};

export default MenuCard;
