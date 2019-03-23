import React, { Component } from "react";
import Graphs from "./../../DataForGraphs";
import Bubbless from "./../../Graphs/Buble";
import SimpleMap from "./../../map";
import Tweets from "./tweets";
import ProgressBars from "./../../charts/progressBar";
class UserBio extends Component {
  state = {};
  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6 col-md-offset-3 m-3">
          <Tweets />
          <div
            style={{
              maxWidth: 500,
              marginTop: 10,
              marginLeft: 70
            }}
          >
            <ProgressBars />
            <Graphs />
            <Bubbless />
           {/* <SimpleMap />*/}
          </div>
        </div>
      </div>
    );
  }
}

export default UserBio;
