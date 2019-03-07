import React, { Component } from "react";
import "../css/home-style.css";

class RegularIcon extends Component {
  state = {};
  render() {
    let { iconName } = this.props;
    iconName += " my-3";
    return (
      <React.Fragment>
        <div className=" blockicon ease">
          <i className={iconName} />
        </div>
      </React.Fragment>
    );
  }
}

export default RegularIcon;
