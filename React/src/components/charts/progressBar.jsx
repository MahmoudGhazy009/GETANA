import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
class ProgressBars extends Component {
  state = { data: this.props.data, name: this.props.name };
  render() {
    return (
      <div
        style={{
          paddingLeft: 40,
          border: "1px solid #e1e8ed",
          borderRadius: 5,
          margin: "auto",
          width: 600,
          padding: 2
        }}
      >
        {/*<ProgressBar className="mt-2" animated variant="success" now={45} />
        <ProgressBar className="mt-2" variant="warning" now={45} />*/}
        {/*Object.entries(this.state.data).map(([key, value]) => {
          <ProgressBar
            className="mt-2"
            style={{ width: 450, height: 20, color: "#caced4" }}
            variant="info"
            label={key}
            now={value}
          />;
        })*/}

        <form className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <h3>{this.state.name}</h3>
          </div>
        </form>
        {Object.entries(this.state.data).map((item, index) => (
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <ProgressBar
                className="mt-2"
                style={{ width: 450, height: 20, background: "#000" }}
                variant="warning"
                label={item[0]}
                now={item[1] * 15}
                max={200}
              />
            </div>
            <span>{item[1]}</span>
          </form>
        ))}
      </div>
    );
  }
}

export default ProgressBars;
