import React, { Component } from "react";
import FunFacts from "./component/funFacts";
import Footer from "./component/footer";
import "./css/home-style.css";
import RegularIcon from "./component/regularIcon";
import Anm from "./anm"
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import Rotate from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';
import HeadShake from 'react-reveal/HeadShake';
///lsa mst5dmthash
////
class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        
        <section
          id="Home"
          className="cover"
          data-paroller-factor="0.3"
          style={{ marginTop: 0,marginBottom:44,height:800}}
        >
        
          <div className="coverwrap">
            <div className="coverinfo">
              <div className="covercontent">
                <div>
                  <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                  
                  <Zoom forever duration={3000} cascade>

                    <h1
                      className="covertitle text-center "
                      style={{paddingLeft: '21%' }}
                    >
                      TRACK. EXPLORE. STREAM
                    </h1>
                    </Zoom>
                    <Bounce left cascade>
                    <p className="coversubtitle text-center padding" style={{paddingLeft: '21%' }}>
                      Simple, Intelligent, Analytics for Social Media Campaigns
                      & Events
                    </p>
                    </Bounce>
                    <div className="text-center padding">
                      <Flip left cascade >
                      <Link to="/explore" className="btn btn-light btn-lg" style={{color:"#fff",background:"#00c3da",border:"0px", marginLeft:"10%"}}>
                        <HeadShake left forever> Explore Now </HeadShake> 
                      </Link>
                      </Flip>
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
          <div className="gg" style={{background:"#00c3da"}} />
        </div>
        
        
        <div className="container" style={{marginBottom:80}}>
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
              <Link className="navbar-brand scroll" to="/trends">
  <RegularIcon iconName={"fa fa-flask"} /></Link>
                <Rotate forever cascade><h3 className="margineText">Trends Map</h3></Rotate>
                <div className="nn my-3" />
                <p className="text-center">Display data-driven social media activity live on a custom multi-platform streaming wall at your event, venue, or office.</p>
              </div>
            </div>
          </div>
        </div>
        <FunFacts />
        
        <div className="whyus" style={{padding:0,paddingTop:"40px"}}>
          <div className="x">
          <Rotate forever cascade>
            <h1
              className="covertitle"
              style={{ textAlign: "center", color: "black", fontSize: 40 }}
            >
              WHY US
            </h1>
            </Rotate>
            <Bounce left cascade>
            <p className="spantitlee" style={{ color: "black" }}>
              6 REASONS WHY WE ARE THE BEST
            </p>
            </Bounce>
            <div className="gg" />
          </div>
          
          <div className="why" style={{marginLeft:"5%"}}>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="feature">
                  <Rotate forever cascade> <h3 style={{fontSize:30}}> SPEED </h3> </Rotate>
                    <p>
                      raesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature">
                  <Rotate forever cascade> <h3>QUALITY</h3> </Rotate>
                    <p>
                      Praesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="feature">
                  <Rotate forever cascade> <h3>EXPERTISE</h3> </Rotate>
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
                  <Rotate forever cascade> <h3>SECURITY</h3> </Rotate>
                    <p>
                      Praesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature">
                    <br></br>
                  <Rotate forever cascade><h3>RELIABILITY</h3></Rotate>
                  <br></br>
                    <p>
                      Praesent vulputate dolor velit, in condimentum odio
                      pellentesin condimentum odio pellentesque libero. Nulla
                      facilisi.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="feature">
                    <br></br>
                  <Rotate forever cascade><h3>PRICE</h3></Rotate>
                  <br></br>
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

        <Footer/>
        
        
      </React.Fragment>
    );
  }
}

export default Home;
