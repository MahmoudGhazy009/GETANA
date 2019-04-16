import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Tweets from "./tweets";
import UserBio from "./userBio";
import searchLogo from "../images/searchLogo.png";
import { sendTweet } from "./../../../servics/tweetService";
import AnalysisIcon from "./wordAnalysis";
import WordCloud from "./wordCloud";
import Doughnutt from "../../Graphs/Doughnut";
import ReactLoading from "react-loading";
import ClipLoader from "react-spinners/ClipLoader";

class TweetsRender extends Form {
  state = {
    searchQuery: "",
    data: { search: "" },
    errors: {},
    tweets: { timeline: [{ name: "8", user_pic: "#" }] },
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

    const { data: tweets } = await sendTweet("/HashTag", this.state.data);
    // const {data: tweets}=await getTweets();

    this.setState({ tweets });
    // console.log("here what back",tweets);
  };

  render() {
    return (
      <React.Fragment>
        {/* <UserBio />*/}
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
        {console.log(this.state.tweets, "ppp")}
        {this.state.tweets.timeline.length < 2 &&
          (this.state.clicked && (
            <div
              style={{
                marginLeft: 630
              }}
            >
              <ReactLoading
                type="balls"
                color="#2e98cc"
                height={100}
                width={100}
              />
              {/*
              <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={"#2e98cc"}
                loading={true}
              />*/}
            </div>
          ))}
        {this.state.tweets.timeline.length > 2 && (
          <div>
            <div
              style={{
                width: 500,
                height: 400,
                marginLeft: 420,
                marginTop: 50
              }}
            >
              <AnalysisIcon data={this.state.tweets.analysis.freq_tweet_app} />
              <Doughnutt data={this.state.tweets.analysis.freq_tweet_type} />
            </div>
            <WordCloud words={this.state.tweets.analysis.freq_tweet_hashtag} />
            <Tweets tweet={this.state.tweets.timeline} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default TweetsRender;
