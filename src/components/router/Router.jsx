import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Contact from "../contact/Contact";
import Cart from "../cart/Cart"
import Shipping from "../cart/Shipping"
import Login from "../login/Login";
import Profile from "../profile/Profile";
import MyOrders from "../myOrders/MyOrders";
import OrderDetails from "../myOrders/OrderDetails";
import About from "../about/About";
import RegistrationSuccess from "../login/RegistrationSuccess";
import { useSelector } from "react-redux";

const Router = () => {
    const loggedIn = useSelector(state => state.user.isAuthenticated.isAuth)
    const regFinished = useSelector(state => state.user.process.type === "finished")

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/login" element={loggedIn ? <Profile /> : <Login />} />
            <Route path="/profile" element={loggedIn ? <Profile /> : <Login />} />
            <Route path="/myorders" element={loggedIn ? <MyOrders /> : <Login />} />
            <Route path="/order/:id" element={loggedIn ? <OrderDetails /> : <Login />} />
            <Route path="/registration-successful" element={regFinished ? <RegistrationSuccess /> : <Home />} />
            <Route path="*" element={<Home />} />
        </Routes>
    )
}

export default Router