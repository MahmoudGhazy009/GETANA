import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
class ProgressBars extends Component {
  render() {
    return (
      <div>
        <ProgressBar className="mt-2" animated variant="success" now={45} />
        <ProgressBar className="mt-2" variant="warning" now={45} />
        <ProgressBar
          className="mt-2"
          variant="info"
          striped
          label={65}
          now={65}
        />
      </div>
    );
  }
}

export default ProgressBars;
