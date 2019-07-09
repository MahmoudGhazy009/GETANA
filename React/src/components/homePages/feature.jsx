import React, { Component } from "react";
import "./css/home-style.css";
import RegularIcon from "./component/regularIcon";
import { Link } from "react-router-dom";
import Rotate from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';
import HeadShake from 'react-reveal/HeadShake';
import Footer from "./component/footer";

class Feature extends Component {
  render() {
    return (
      <React.Fragment>
        <section
          id="Home"
          className="featureIMG"
          data-paroller-factor="0.3"
          style={{
            marginTop: 56,
            height: 650,
            marginBottom:70
          }}
        >
          
          <div className="coverwrap">
            <div className="coverinfo">
              <div>
                <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  <div className="text-center" style={{ paddingLeft: 160 }}>
                    <div className="">
                    <Bounce duration={2000} forever cascade> 
                    <h1
                      className="covertitle text-center "
                      style={{paddingLeft: '10%',paddingTop:"20%", }}
                    >
                      AFFORDABLE  HASHTAGs
                    </h1>
                    </Bounce>
                    <Bounce left cascade>
                      <p
                        className="coversubtitle text-center"
                        style={{ paddingLeft: 160 }}
                      >
                        Understanding hashtags & hashtag trends associated with your brand 
                      </p>
                      </Bounce>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </section>
        <div className="x">
        <Rotate forever cascade>
          <h1
            className="covertitle"
            style={{ textAlign: "center", color: "black", fontSize: 40,paddingBottom:20 }}
          >
            OUR SERVICES
          </h1>
          </Rotate>
          <Bounce left cascade>
          <p className="spantitlee" style={{ color: "black" }}>
            WE ARE EXPERTS IN DEVELOPING YOUR BUSINESS
          </p>
          </Bounce>
        </div>
          
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="feature text-center ">
                <Link className="navbar-brand scroll" to="/explore">
                  <RegularIcon iconName={"fa fa-lightbulb-o"} />
                </Link>
                 <Rotate forever cascade><h3 className="margineText">EXPLORE</h3></Rotate>
                <div className="nn my-3" />
                <p className="text-center">Social media and generate snapshot reports of recent data with the Hashtracking Explorer. No subscription needed.</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="feature text-center ">
                <Link className="navbar-brand scroll" to="/person">
                  <RegularIcon iconName={"fa fa-steam-square"} />
                </Link>

                <Rotate forever cascade><h3 className="margineText">Person</h3></Rotate>
                <div className="nn my-3" />
                <p className="text-center">Create, share and store unlimited reports infographics from your tracker data. Archive your reports for later use.</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-flask"} />
                <Rotate forever cascade><h3 className="margineText">Compare</h3></Rotate>
                <div className="nn my-3" />
                <p className="text-center">Display data-driven social media activity live on a custom multi-platform streaming wall at your event, venue, or office.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-share-alt-square"} />
                <Rotate forever cascade><h3 className="margineText">TRACK&SHARE</h3></Rotate>
                <div className="nn my-3" />
                <p className="text-center">Gather detailed history, track in real time, and never miss a post. </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-heart-o"} />
                <Rotate forever cascade><h3 className="margineText">SEE IN COLOR</h3></Rotate>
                <div className="nn my-3" />
                <p className="text-center">Patent-pending ColorTracking analysis lets you sort Instagram results by color and analyze how colors affect image engagement on all your efforts.</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="feature text-center ">
                <RegularIcon iconName={"fa fa-lightbulb-o"} />
                <Rotate forever cascade><h3 className="margineText">DIG INTO YOUR DATA</h3></Rotate>
                <div className="nn my-3" />
                <p className="text-center">Engagement analysis, Buzz Words, Other Hashtags, Platforms and geodata.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default Feature;
