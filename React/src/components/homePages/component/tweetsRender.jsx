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
    tweets:{ timeline:[{name:"8",user_pic:"#"}]},
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
    

    const { data: tweets } = await sendTweet(this.state.data);
   // const {data: tweets}=await getTweets();
console.log('hiii');
   this.setState({tweets})
    console.log("Submittesdsdd", tweets.timeline[1]);
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
        {console.log(this.state.tweets.timeline.length)}
        {this.state.tweets.timeline.length>2 &&
        
        
       <Tweets tweet={this.state.tweets.timeline}/>}

        {/*<UserBio />*/}
      </React.Fragment>
    );
  }
}

export default TweetsRender;
