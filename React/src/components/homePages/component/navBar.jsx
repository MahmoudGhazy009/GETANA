import React, { Component } from "react";
import logo2 from "../images/logo2.png";
import { NavLink, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav
          className="fixed-top navbar navbar-expand-lg "
          style={{ height: 70 }}
        >
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggler ml-auto"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <Link className="navbar-brand scroll" to="/Home">
                <img src={logo2} alt="logo" className="brand_logo" />
              </Link>
            </div>

            <div
              className="collapse navbar-collapse"
              id="mobile-navbar-collapse"
            >
              <ul className="navbar-nav ml-auto text-center">
                <li>
                  <NavLink className="nav-item nav-link" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className="nav-item nav-link" to="/about">
                    About
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className="nav-item nav-link" to="/feature">
                    Features
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className="nav-item nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className="nav-item nav-link" to="/registerForm">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
