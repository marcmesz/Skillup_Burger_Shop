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

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/registration-successful" element={<RegistrationSuccess />} />
        </Routes>
    )
}

export default Router