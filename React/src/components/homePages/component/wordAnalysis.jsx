import React, { Component } from "react";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
class AnalysisIcon extends Component {
  state = {};
  render() {
    let { data } = this.props;

    return (
      <React.Fragment>
        <i
          style={{ color: "#83a0a7", marginLeft: 80 }}
          className="fa fa-laptop fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter Web App"]}</h4>
        </i>
        <i
          style={{ color: "#000", marginLeft: 40 }}
          className="fa fa-apple fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter for iPhone"]}</h4>
        </i>
        <i
          style={{ color: "#afa793", marginLeft: 40 }}
          className="fa fa-desktop fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter Web Client"]}</h4>
        </i>
        <i
          style={{ color: "#0c9", marginLeft: 40 }}
          className="fa fa-android fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter for Android"]}</h4>
        </i>
        <i
          style={{ color: "#86c7f3", marginLeft: 40 }}
          className="fa fa-tablet fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter for iPad"]}</h4>
        </i>
      </React.Fragment>
    );
  }
}

export default AnalysisIcon;
