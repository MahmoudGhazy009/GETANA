import React from "react";
import Joi from "joi-browser";
import Form from "./component/form";
import searchLogo from "./images/searchLogo.png";
import UserBio from "./component/userBio";
import ProgressBars from "./../charts/progressBar";

import { sendTweet } from "./../../servics/tweetService";
import { Redirect } from "react-router-dom";
class PersonAnalysis extends Form {
  state = {
    searchQuery: "",

    data: { search: "" },
    errors: {},
    tweets: { timeline: [{ name: "8", user_pic: "#" }] }
  };
  schema = {
    search: Joi.string()
      .required()
      .label("Search")
      .min(3)
  };
  doSubmit = async () => {
    // Call the server
    console.log("here what back");

    let clicked = true;
    this.setState(this.state.data);
    //this.setState({ clicked });

    const { data: tweets } = await sendTweet("/Person", this.state.data);
    // const {data: tweets}=await getTweets();

    this.setState({ tweets });
    console.log("here what back", tweets);
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            maxWidth: 500,
            marginLeft: 250,
            paddingTop: 100,
            margin: "auto"
          }}
        >
          <img
            src={searchLogo}
            alt="searchLogo"
            style={{ paddingTop: 80, paddingBottom: 10 }}
          />
          <div style={{ marginBottom: 70 }}>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("search")}
              <div
                style={{
                  marginLeft: 215
                }}
              >
                {this.renderButton("Search")}
              </div>
            </form>
          </div>
        </div>

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
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <h3>Top Tweeted:</h3>
            </div>
          </form>

          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <ProgressBars />
            </div>
            <span>COUNT</span>
          </form>
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <ProgressBars />
            </div>
            <span>COUNT</span>
          </form>
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <ProgressBars />
            </div>
            <span>COUNT</span>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default PersonAnalysis;
