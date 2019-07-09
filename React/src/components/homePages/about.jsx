import React, { Component } from "react";
import "./css/home-style.css";
import { Link } from "react-router-dom";
import Rotate from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import Footer from "./component/footer";

import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';
import HeadShake from 'react-reveal/HeadShake';
import logo from "./images/about-1.jpg";
import about1 from "./images/about-1.jpg";
import about2 from "./images/about-2.jpg";
import about3 from "./images/about-3.jpg";

import khaled from "./images/sief.png";
import amr from "./images/amr.jpg";
import ghazy from "./images/ghazy.png";
import zeyad from "./images/zeyad.jpeg";
import khalid from "./images/khalid.png";

import FunFacts from "./component/funFacts";
class About extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <section
          id="Home"
          className="cover2"
          data-paroller-factor="0.3"
          style={{ backgroundPosition: "center 0", marginTop: 56,marginBottom:40,height:650}}
        >
          <div className="coverwrap">
            <div className="coverinfo">
              <div className="covercontent">
                <div style={{marginLeft:"5%"}}>
                  <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  <Bounce duration={2000} forever cascade>
                    <h3
                      className="covertitle text-center"
                      style={{ paddingLeft: 160 }}
                    >
                      HASHTAGS  ARE   OUR  THING 
                    </h3>
                  </Bounce>
                  <Bounce left cascade>
                    <p
                      className="coversubtitle text-center"
                      style={{ paddingLeft: 160 }}
                    >
                      Simple, Intelligent, Analytics for Social Media Campaigns
                      & Events
                    </p>
                    </Bounce>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="TEAMM" className="Ourteam" style={{marginTop:0}}>
          <div className="x">
          <Rotate forever cascade>
            <h1
              className="covertitle"
              style={{ textAlign: "center", color: "black", fontSize: 40 }}
            >
              MEET THE TEAM
            </h1>
            </Rotate>
            <Bounce left cascade>
            <p className="spantitlee" style={{ color: "black" }}>
              WE ARE HERE TO HELP YOU WITH ANYTHING YOU NEED
            </p>
            </Bounce>
            <div className="gg" />
          </div>
        </div>

        <div className="why">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="featurez">
                  <div className="d">
                    <h2>
                      Amr Khaled
                      <div className="gg" style={{ marginTop: 20 }} />
                    </h2>
                  </div>
                  <img src={amr} alt="Amr Khaled" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="featurez">
                  <div className="d">
                    <h2>
                      Mahmoud Ghazy
                      <div className="gg" style={{ marginTop: 20 }} />
                    </h2>
                  </div>
                  <img src={ghazy} alt="Mahmoud Ghazy" />
                </div>
              </div>

              <div className="col-md-4">
                <div className="featurez">
                  <div className="d">
                    <h2>
                      Khalid Amer
                      <div className="gg" style={{ marginTop: 20 }} />
                    </h2>
                  </div>
                  <img src={khalid} alt="Khalid Amer" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{ marginLeft: 250, marginTop: 50, width: "100%" }}
          >
            <div className="col-md-4">
              <div className="featurez">
                <div className="d">
                  <h2>
                    Zeyad Elsawy
                    <div className="gg" style={{ marginTop: 20 }} />
                  </h2>
                </div>
                <img src={zeyad} alt="Zeyad Elsawy" />
              </div>
            </div>

            <div className="col-md-4" style={{ marginLeft: 50 }}>
              <div className="featurez">
                <div className="d">
                  <h2>
                    Khaled Seif
                    <div className="gg" style={{ marginTop: 20 }} />
                  </h2>
                </div>
                <img src={khaled} alt="Khaled Seif" />
              </div>
            </div>
          </div>
        </div>

        <FunFacts />
        
        <Footer/>
      </React.Fragment>
    );
  }
}

export default About;
