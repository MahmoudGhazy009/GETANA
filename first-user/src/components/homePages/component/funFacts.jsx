import React from "react";
import "../css/home-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
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
        <h1
          className="cover_title"
          style={{ textAlign: "center", color: "#fff", fontSize: 40 }}
        >
          FUN FACTS
        </h1>
        <p className="spantitlee" style={{ color: "#fff" }}>
          SOME OF THE COOL FACTS ABOUT US
        </p>
        <div className="gg" />
      </div>

      <div className="likes">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="feature ">
                <FontAwesomeIcon
                  icon="thumbs-up"
                  style={{ color: "red", fontSize: 40, marginLeft: 100 }}
                />
                <h1 style={{ marginTop: 50 }}>2780</h1>
                <p>PROJECTS</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature">
                <FontAwesomeIcon
                  icon="smile"
                  style={{
                    color: "red",
                    fontSize: 50,
                    marginLeft: 90,
                    paddingTop: 10
                  }}
                />
                <i className="fa fa-smile" />

                <h1>487</h1>
                <p className="mt-6">CLIENTS</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature">
                <i className="fa fa-coffee" style={{ marginLeft: 100 }} />
                <h1>13730</h1>
                <p>IMPERSSION</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature">
                <i className="fa fa-gift" style={{ marginLeft: 70 }} />
                <h1>154</h1>
                <p>AWARDS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
