import "../../styles/profile.scss";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import me from "../../assets/skj.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { scrollToTop } from "../../functions/scrollToTop"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart.totalItems)
  const myEmail = useSelector(state => state.user.isAuthenticated.email)
  const myProfile = useSelector(state => state.user.users.find(user => user.email === myEmail))
  const process = useSelector(state => state.user.process)
  const checkout = process.checkout

  const options = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  }

  useEffect(() => {
    scrollToTop()
    if (cartItems > 0 && checkout && process.type === "loggedIn") {
      dispatch(userActions.handleProcess())
      navigate("/cart")
    }
  }, [cartItems, checkout, process.type, navigate, dispatch])

  return (
    <section className="profile">
      <h1 className="page-title">My Profile</h1>
      <main>
        <motion.img src={me} alt="User" {...options} />
        <motion.h5 {...options} transition={{ delay: 0.3 }}>
          {myProfile.name}
        </motion.h5>

        <motion.div
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          <Link to="/my-orders">Orders</Link>
        </motion.div>

        <motion.button
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          onClick={() => dispatch(userActions.logoutUser())}
        >
          Logout
        </motion.button>
      </main>
    </section>
  );
};

export default Profile;
