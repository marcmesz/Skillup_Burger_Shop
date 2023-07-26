import "../../styles/DropdownMenu.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";

const DropdownMenu = ({ handleNavOpen }) => {
  const [navLinks, setNavLinks] = useState([])
  const [showMenu, setshowMenu] = useState(false)
  const loggedIn = useSelector(state => state.user.isAuthenticated.isAuth)
  const navigate = useNavigate()

  const handleLoginButton = () => {
    handleNavOpen()
    navigate("/login")
  }

  const handleDropdownItems = () => {
    handleNavOpen()
    setshowMenu(false)
  }

  useEffect(() => {
    axios
      .get("/data/navigation.json")
      .then(res => setNavLinks(res.data))
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-none">
        <div className="container">
          <div className="btn-group">
            {
              loggedIn ?
                <>
                  <button
                    id="dropdown-toggle"
                    type="button"
                    className="btn btn-lg dropdown-toggle d-flex align-items-center g-20"
                    onClick={() => setshowMenu(prev => !prev)}
                  >
                    <FaUser />
                    <span className="ms-1">My Account</span>
                  </button>
                  <ul className={showMenu ? "dropdown-menu dropdown-menu-end show" : "dropdown-menu dropdown-menu-end"}>
                    {navLinks.map((d, i) => (
                      <li key={i}>
                        <Link to={d.path} onClick={handleDropdownItems}>
                          <button className="dropdown-item" type="button">
                            {d.name}
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
                :
                <>
                  <button className="btn-lg btn-login d-flex align-items-center" onClick={handleLoginButton}>
                    <span className="ms-1">Sign in</span>
                    <FiLogIn />
                  </button>
                </>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default DropdownMenu;