import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Tweets from "./tweets";
import UserBio from "./userBio";
import searchLogo from "../images/searchLogo.png";

import { sendTweet } from "./../../../servics/tweetService";

class TweetsRender extends Form {
  state = {
    searchQuery: "",
    data: { search: "" },
    errors: {},
    tweets: ["hi Ghazy"],
    clicked: false
  };
  schema = {
    search: Joi.string()
      .required()
      .label("Search")
      .min(3)
  };
  /*async componentDidMount() {
    const originalTweets = this.state.data.search;

    await sendTweet(originalTweets);
  }*/
  doSubmit = async () => {
    // Call the server
    let clicked = true;
    this.setState(this.state.data);
    this.setState({ clicked });
    

    const { data: c } = await sendTweet(this.state.data);
   // const {data: tweets}=await getTweets();
    console.log("Submittesdsdd", c.timeline[1]);
   // console.log("here what back",tweets);
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            maxWidth: 500,
            marginLeft: 250,
            paddingTop: 10,
            margin: "auto"
          }}
        >
          <img
            src={searchLogo}
            alt="searchLogo"
            style={{ paddingTop: 80, paddingBottom: 10 }}
          />
          <div>
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
        {this.state.clicked && <Tweets />}

        <UserBio />
      </React.Fragment>
    );
  }
}

export default TweetsRender;
