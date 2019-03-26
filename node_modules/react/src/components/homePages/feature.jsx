import React, { Component } from "react";
import "./css/home-style.css";
import RegularIcon from "./component/regularIcon";
import { Link } from "react-router-dom";

class Feature extends Component {
  render() {
    return (
      <React.Fragment>
        <section
          id="Home"
          className="cover"
          data-paroller-factor="0.3"
          style={{
            marginTop: 75,
            backgroundPosition: "center 0px",
            height: 500
          }}
        >
          <div className="coverwrap">
            <div className="coverinfo">
              <div>
                <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  <div className="text-center" style={{ paddingLeft: 160 }}>
                    <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                      <h1
                        className="covertitle text-center"
                        style={{ paddingLeft: 160 }}
                      >
                        HASHTAGS <b>ARE</b> Our <b>Features</b>
                      </h1>
                      <p
                        className="coversubtitle text-center"
                        style={{ paddingLeft: 160 }}
                      >
                        Simple, Intelligent, Analytics for Social Media
                        Campaigns & Events
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="x">
          <h1
            className="covertitle"
            style={{ textAlign: "center", color: "black", fontSize: 40 }}
          >
            OUR SERVICES
          </h1>
          <p className="spantitlee" style={{ color: "black" }}>
            WE ARE EXPERTS IN DEVELOPING YOUR BUSINESS
          </p>
          <div className="gg" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="feature text-center ">
                <Link className="navbar-brand scroll" to="/explore">
                  <RegularIcon iconName={"fa fa-lightbulb-o"} />
                </Link>
                <h3 className="margineText">EXPLORE</h3>
                <div className="gg my-3" />
                <p className="text-center">000</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-steam-square"} />
                <h3 className="margineText">STREAM</h3>
                <div className="gg my-3" />
                <p className="text-center">000</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-flask"} />
                <h3 className="margineText">COMPARE</h3>
                <div className="gg my-3" />
                <p className="text-center">000</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-share-alt-square"} />
                <h3 className="margineText">TRACK&SHARE</h3>
                <div className="gg my-3" />
                <p className="text-center">000</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-heart-o"} />
                <h3 className="margineText">SEE IN COLOR</h3>
                <div className="gg my-3" />
                <p className="text-center">000</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-lightbulb-o"} />
                <h3 className="margineText">DIG INTO YOUR DATA</h3>
                <div className="gg my-3" />
                <p className="text-center">000</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feature;
