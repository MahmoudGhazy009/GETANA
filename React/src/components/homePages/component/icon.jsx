import React, { Component } from "react";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
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

class Icon extends Component {
  state = {};
  render() {
    let { iconName } = this.props;

    return (
      <React.Fragment>
        <div className=" blockicon ease">
          <i className={"my-3"}>
            <FontAwesomeIcon icon={iconName} style={{ fontSize: 40 }} />
          </i>
        </div>
      </React.Fragment>
    );
  }
}

export default Icon;
