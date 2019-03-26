import React, { Component } from "react";
import Icon from "./icon";
import "../css/home-style.css";

class FeatureIcon extends Component {
  state = {};
  render() {
    let { iconName ,Name} = this.props;
    return (
      <div className="col-sm">
        <div className="feature text-center ">
          <Icon iconName={iconName} />
        </div>
        <h3 className="margineText">{Name}</h3>
        <div className="gg my-3">
          <br />
        </div>
        <p>
          Social media and generate snapshot reports of recent data with the
          Hashtracking Explorer. No subscription needed.
        </p>
      </div>
    );
  }
}

export default FeatureIcon;
