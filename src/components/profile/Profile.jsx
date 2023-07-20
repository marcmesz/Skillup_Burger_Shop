import "../../styles/profile.scss";
import React from "react";
import { motion } from "framer-motion";
import me from "../../assets/skj.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
//import { MdDashboard } from "react-icons/md";

const Profile = () => {
  const dispatch = useDispatch()

  const options = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="profile">
      <main>
        <motion.img src={me} alt="User" {...options} />
        <motion.h5 {...options} transition={{ delay: 0.3 }}>
          Nelson
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
          <Link to="/myorders">Orders</Link>
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
