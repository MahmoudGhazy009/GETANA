import React, { Component } from "react";
import Like from "./tweetsIcon/like";

class Card extends Component {
  state = { content: this.props.content };
  render() {
    return (
      <div>
        <div
          className="card text-black bg-light"
          style={{
            maxWidth: 500,
            marginLeft: 70,
            marginTop: 300,
            margin: "auto",
            marginBottom: 40
          }}
        >
          <div className="card-header row">
            <div className="column">
              <img
                className="rounded-circle "
                src="#"
                alt="name"
                style={{
                  maxWidth: 70,
                  maxHeight: 70,
                  verticalAlign: "middle"
                }}
              />
            </div>
            <div className="column">
              <h4 style={{ marginLeft: 20, marginTop: 5 }}>
                <a style={{ textDecoration: "none" }} href="#" target="_blank">
                  name
                </a>
              </h4>
            </div>
          </div>
          <div className="card-body">
            <p className="card-text">
              <a style={{ textDecoration: "none" }} target="_blank" href="#">
                {this.state.content}
              </a>
            </p>
          </div>
          <Like like={5} retweet={5} />

          <br />
        </div>
      </div>
    );
  }
}

export default Card;
