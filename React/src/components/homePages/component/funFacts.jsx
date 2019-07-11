import React from "react";
import "../css/home-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Rotate from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';

import Slide from 'react-reveal/Slide';
import HeadShake from 'react-reveal/HeadShake';

import {
  faFlask,
  faCoffee,
  faThumbsUp,
  faSmile
} from "@fortawesome/free-solid-svg-icons";
library.add(faFlask, faCoffee, faThumbsUp, faSmile);

const FunFacts = () => {
  return (
    <div className="funfacts">
      <div className="black">
       <Rotate forever cascade>
        <h1
          className="cover_title"
          style={{ textAlign: "center", color: "#fff", fontSize: 40 }}
        >
          FUN FACTS
        </h1>
        </Rotate>
        <Bounce left cascade>
        <p className="spantitlee" style={{ color: "#fff" }}>
          SOME OF THE COOL FACTS ABOUT US
        </p>
        </Bounce>
        <div className="gg" />
      </div>

      <div className="likes">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="feature ">
                <FontAwesomeIcon
                  icon="thumbs-up"
                  style={{
                    color: "#f9461d",
                    fontSize: 40,
                    marginLeft: 100,
                    marginTop: 15
                  }}
                />
                <h1 style={{ marginTop: 35 }}> <Fade cascade forever>278</Fade></h1>
                
                <Bounce left cascade><p>PROJECTS</p></Bounce>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature">
                <FontAwesomeIcon
                  icon="smile"
                  style={{
                    color: "#f9461d",
                    fontSize: 50,
                    marginLeft: 90,
                    paddingTop: 10
                  }}
                />

                <h1 style={{ marginTop: 40 }}><Bounce cascade forever>80</Bounce></h1>
                <Bounce left cascade><p>ClIENTS</p></Bounce>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature">
              <FontAwesomeIcon
                  icon="coffee"
                  style={{
                    color: "#f9461d",
                    fontSize: 50,
                    marginLeft: 90,
                    paddingTop: 10
                  }}
                />
                <h1 style={{ marginTop: 40 }}><Fade cascade forever>90</Fade></h1>
                <Bounce left cascade><p>IMPERSION</p></Bounce>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature">
              <FontAwesomeIcon
                  icon="smile"
                  style={{
                    color: "#f9461d",
                    fontSize: 50,
                    marginLeft: 90,
                    paddingTop: 10
                  }}
                />
                <h1 style={{ marginTop: 40 }}><Bounce cascade forever>278</Bounce></h1>
                <Bounce left cascade><p>AWARDS</p></Bounce>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
