import React from "react";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        position: "relative",
        bottom: 0,
        width: "100%"
      }}
    >
      <div
        className="row justify-content-md-center"
        style={{
          backgroundColor: "#fff"
        }}
      >
        <div className="col-md-3 col-md-offset-3 m-3 text-center py-3">
          <Link className="fb-ic" to="">
            <i className="fa fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x" />
          </Link>
          <Link className="tw-ic" to="">
            <i className="fa fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x" />
          </Link>

          <Link className="ins-ic" to="">
            <i className="fa fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x" />
          </Link>
          <Link className="pin-ic" to="">
            <i className="fa fa-pinterest fa-lg white-text fa-2x" />
          </Link>
        </div>
      </div>

      <div
        className="footer-copyright text-center py-3"
        style={{ backgroundColor: "#272727", color: "#fff" }}
      >
        © 2018 Copyright:
        <Link to="">MDBootstrap.com</Link>
      </div>
    </div>
  );
};

export default Footer;
