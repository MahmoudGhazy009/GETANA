import React, { Component } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardUp,
  MDBCardBody,
  MDBAvatar,
  MDBRotatingCard,
  MDBIcon
} from "mdbreact";
import "../css/cardFlip.css";
class FlippingCardPage extends Component {
  state = {
    like: this.props.likes,
    numTweets: this.props.numTweets,
    following: this.props.following,
    followers: this.props.followers,
    profilePic: this.props.profilePic,
    screenName: this.props.screenName,
    userId: this.props.userId,
    profile_banner: this.props.profile_banner,
    profile_url: this.props.profile_url
  };
  render() {
    return (
      <MDBContainer>
        <MDBRow between>
          <MDBCol
            className="m-auto"
            style={{ minHeight: "10rem", maxWidth: "50%" }}
          >
            <div className="text-center h-100 w-100">
              <MDBCard className="face front" style={{ background: "#1c2939" }}>
                <div>
                  <img
                    style={{ height: "200px" }}
                    className="card-img-top"
                    src={this.state.profile_banner}
                    alt=""
                  />
                </div>
                <div
                  className="mx-auto white"
                  style={{
                    borderRadius: "50%",
                    border: "10px solid #1c2939",
                    margin: "-100px",
                    padding: 10
                  }}
                >
                  <img
                    style={{ height: "auto", maxWidth: "100%" }}
                    src={this.state.profilePic}
                    alt=""
                    className="rounded-circle"
                  />
                </div>
                <MDBCardBody>
                  <h4
                    className="font-weight-bold mt-5"
                    style={{ paddingTop: "40px", color: "#fbfdfe" }}
                  >
                    {this.state.userId}
                  </h4>
                  <hr style={{ background: "#fff", width: "50%" }} />
                  <div className="contaire bord">
                    <div className="row">
                      <div className="col-md-3">
                        <h6 className="font-weight-bold">Tweets</h6>
                      </div>
                      <div className="col-md-3">
                        <h6 className="font-weight-bold">Following</h6>
                      </div>
                      <div className="col-md-3">
                        <h6 className="font-weight-bold">Followers</h6>
                      </div>
                      <div className="col-md-3">
                        <h6 className="font-weight-bold">Likes</h6>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3 log">
                        <h6>{this.state.numTweets}</h6>
                      </div>
                      <div className="col-md-3 log">
                        <h6>{this.state.following}</h6>
                      </div>
                      <div className="col-md-3 log">
                        <h6>{this.state.followers}</h6>
                      </div>
                      <div className="col-md-3 log">
                        <h6>{this.state.like}</h6>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default FlippingCardPage;
