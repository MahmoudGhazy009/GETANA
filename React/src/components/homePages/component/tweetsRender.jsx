import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Tweets from "./tweets";
import UserBio from "./userBio";
import { sendTweet } from "./../../../servics/tweetService";

class TweetsRender extends Form {
  state = {
    searchQuery: "",
    data: { search: "" },
    errors: {},
    tweets: ["hi Ghazy"]
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
    this.setState(this.state.data);

    const { data: c } = await sendTweet(this.state.data);
    console.log("Submittesdsdd", c[c.length - 1]["search"]);
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ maxWidth: 500, marginLeft: 250, marginTop: 100 }}>
          <form onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
            {this.renderInput("search", "Search")}
            {this.renderButton("Search")}
          </form>
        </div>
        <Tweets />

        <UserBio />
      </React.Fragment>
    );
  }
}

export default TweetsRender;
