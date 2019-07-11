import React, { Component } from "react";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
class AnalysisIcon extends Component {
  state = {};
  render() {
    let { data } = this.props;

    return (
      <React.Fragment>
        <div style={{marginLeft:"35%"}}>
        {data ["Twitter Web App"] >= 1 &&<i
          style={{ color: "#83a0a7", marginLeft: 80 }}
          className="fa fa-laptop fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter Web App"]}</h4>
        </i>}
        {data["Twitter for iPhone"]  &&
        <i
          style={{ color: "#000", marginLeft: 40 }}
          className="fa fa-apple fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter for iPhone"]}</h4>
        </i>}
        {data["Twitter Web Client"]  &&
        <i
          style={{ color: "#afa793", marginLeft: 40 }}
          className="fa fa-desktop fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter Web Client"]}</h4>
        </i>}
        {data["Twitter for Android"]  &&
        <i
          style={{ color: "#0c9", marginLeft: 40 }}
          className="fa fa-android fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter for Android"]}</h4>
        </i>}
        {data["Twitter for iPad"]  &&
        <i
          style={{ color: "#86c7f3", marginLeft: 40 }}
          className="fa fa-tablet fa-2x"
        >
          <h4 style={{ marginLeft: 5 }}>{data["Twitter for iPad"]}</h4>
        </i>}
        </div>
      </React.Fragment>
    );
  }
}

export default AnalysisIcon;
