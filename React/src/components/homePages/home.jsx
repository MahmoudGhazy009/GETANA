import React, { Component } from "react";
import FunFacts from "./component/funFacts";
import "./css/home-style.css";
import RegularIcon from "./component/regularIcon";

import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <section
          id="Home"
          className="cover"
          data-paroller-factor="0.3"
          style={{ marginTop: 75 }}
        >
          <div className="coverwrap">
            <div className="coverinfo">
              <div className="covercontent">
                <div>
                  <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                    <h1
                      className="covertitle text-center "
                      style={{ paddingLeft: 160 }}
                    >
                      TRACK. EXPLORE. STREAM
                    </h1>
                    <p className="coversubtitle text-center padding">
                      Simple, Intelligent, Analytics for Social Media Campaigns
                      & Events
                    </p>
                    <div className="text-center padding">
                      <Link to="/about" className="btn btn-light btn-lg">
                        Explore Now
                      </Link>
                    </div>

                    <div className="our">
                      <div className="container">
                        <div
                          className="row"
                          style={{ paddingLeft: 150, paddingTop: 70 }}
                        >
                          <div className="col-md-4 borders">
                            <div className="feature text-center">
                              <Link
                                className="navbar-brand scroll"
                                to="/person"
                              >
                                <RegularIcon iconName={"fa fa-lightbulb-o"} />
                              </Link>

                              <h3 style={{ color: "blueviolet" }}>Track</h3>
                              <div className="gg my-3" />
                            </div>
                          </div>

                          <div className="col-md-4 borders">
                            <div className="feature text-center">
                              <Link
                                className="navbar-brand scroll"
                                to="/explore"
                              >
                                <RegularIcon iconName={"fa fa-heart-o"} />
                              </Link>

                              <h3 style={{ color: "blueviolet" }}>Explore</h3>
                              <div className="gg my-3" />
                            </div>
                          </div>

                          <div className="col-md-4 borders">
                            <div className="feature text-center">
                              <RegularIcon iconName={"fa fa-flask"} />

                              <h3 style={{ color: "blueviolet" }}>Analysis</h3>
                              <div className="gg my-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="whyus">
          <div className="x">
            <h1
              className="covertitle"
              style={{ textAlign: "center", color: "black", fontSize: 40 }}
            >
              WHY US
            </h1>
            <p className="spantitlee" style={{ color: "black" }}>
              6 REASONS WHY WE ARE THE BEST
            </p>
            <div className="gg" />
          </div>

          <div className="why">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="feature">
                    <h3>SPEED</h3>
                    <p>
                      raesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature">
                    <h3>QUALITY</h3>
                    <p>
                      Praesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="feature">
                    <h3>EXPERTISE</h3>
                    <p>
                      Praesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="feature">
                    <h3>SECURITY</h3>
                    <p>
                      Praesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature">
                    <h3>RELIABILITY</h3>
                    <p>
                      Praesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="feature">
                    <h3>PRICE</h3>
                    <p>
                      Praesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rr" />

        <FunFacts />

        <div id="ourservice" className="whyus">
          <div className="x">
            <h1
              className="cover_title"
              style={{ textAlign: "center", color: "black", fontSize: 40 }}
            >
              OUR SERVICES
            </h1>
            <p className="spantitlee" style={{ color: "black" }}>
              WE ARE EXPERTS IN DEVELOPING YOUR BUSINESS
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
