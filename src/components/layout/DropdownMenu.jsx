import "../../styles/DropdownMenu.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";


const DropdownMenu = (props) => {
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    const navs = [
      { name: "Login", path: "/login" },
      { name: "Orders", path: "/myorders" },
      { name: "Logout", path: "/login" }

    ];
    setNavLinks(navs);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-none">
        <div className="container">
          <div className="btn-group">
            <button
              id="dropdown-toggle"
              type="button"
              className="btn btn-lg dropdown-toggle d-flex align-items-center g-20"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <FaUser />
              <span className="ms-1">My Account</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {navLinks.map((d, i) => (
                <li key={i}>
                  <Link to={d.path} onClick={props.handleNavOpen}>
                    <button className="dropdown-item" type="button">
                      {d.name}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default DropdownMenu;