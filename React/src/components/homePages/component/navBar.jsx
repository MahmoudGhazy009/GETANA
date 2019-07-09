import React, { Component } from "react";
import logo2 from "../images/logo.png";
//import logo2 from "../images/watchman.png";
import { NavLink, Link } from "react-router-dom";
import "./nav.css"
class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav
          id="navbar"
          className="fixed-top navbar navbar-expand-lg "
          style={{ height: 56,fontFamily:"Nanum Pen Script, cursive"}}
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
                  <NavLink className="nav-item nav-link" style={{fontSize:14}} to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className="nav-item nav-link"  style={{fontSize:14,marginLeft:20}} to="/about">
                    About
                  </NavLink>
                </li>
                <li className="">
                  <NavLink className="nav-item nav-link"  style={{fontSize:14 ,marginLeft:20,paddingRight: 30}} to="/feature">
                    Features
                  </NavLink>
                </li>

                <li>
                <a
            className="fb-ic"
            href="https://www.facebook.com/Twitter-Olive-2604548039765013/?modal=admin_todo_tour"
            target="_blank" style={{paddingLeft:30,borderLeft:"1px solid white"}}>
            <i className="fa fa-facebook-f fa-sm white-text fa-2x"  style={{fontSize:22,color:"#17a2b8",paddingTop:13}} />
             </a>
                
                </li>

                <li>
                
                <a
            className="tw-ic"
            href="https://twitter.com/TweetOlive1"
            target="_blank"
          >
            <i className="fa fa-twitter fa-sm white-text fa-2x"  style={{fontSize:22,color:"#38A1F3",paddingTop:13}}  />
          </a>
                
                </li>

                <li>
                
                <a
            className="ins-ic"
            href="https://www.instagram.com/twitterolive/"
            target="_blank"
          >
            <i className="fa fa-instagram fa-sm white-text fa-2x" style={{fontSize:22,color:"#17a2b8",paddingTop:13}} />
          </a>
                
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
