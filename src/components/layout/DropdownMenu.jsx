import "../../styles/DropdownMenu.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem
} from 'mdb-react-ui-kit';

const DropdownMenu = ({ handleNavOpen }) => {
  const [navLinks, setNavLinks] = useState([])
  const loggedIn = useSelector(state => state.user.isAuthenticated.isAuth)
  const navigate = useNavigate()

  const handleLoginButton = () => {
    handleNavOpen("noScroll")
    navigate("/login")
  }

  const handleDropdownItems = (link) => {
    handleNavOpen()
    navigate(link)
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
                  <MDBDropdown>
                    <MDBDropdownToggle
                      id="dropdown-toggle"
                      className="btn btn-lg"
                    >
                      <FaUser /> My Account
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      {navLinks.map((d, i) => (
                        <MDBDropdownItem
                          key={i}
                          link
                          onClick={() => handleDropdownItems(d.path)}
                          childTag='button'
                        >
                          {d.name}
                        </MDBDropdownItem>
                      ))}
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </>
                :
                <>
                  <button
                    className="btn-lg btn-login d-flex align-items-center"
                    onClick={handleLoginButton}
                  >
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