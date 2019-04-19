import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
class ProgressBars extends Component {
  state = { label: this.props.label, value: this.props.value };
  render() {
    return (
      <div>
        {/*<ProgressBar className="mt-2" animated variant="success" now={45} />
        <ProgressBar className="mt-2" variant="warning" now={45} />*/}
        <ProgressBar
          className="mt-2"
          style={{ width: 450, height: 20 }}
          variant="info"
          label={this.state.label}
          now={this.state.value}
        />
      </div>
    );
  }
}

export default ProgressBars;
