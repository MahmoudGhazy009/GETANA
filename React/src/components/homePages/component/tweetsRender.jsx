import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Tweets from "./tweets";
import UserBio from "./userBio";

class TweetsRender extends Form {
  state = {
    searchQuery: "",
    data: { search: "" },
    errors: {}
  };
  schema = {
    search: Joi.string()
      .required()
      .label("Search")
      .min(3)
  };
  doSubmit = () => {
    // Call the server
    console.log("Submitted", this.state.data.search);
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
