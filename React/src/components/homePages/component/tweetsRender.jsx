import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Tweets from "./tweets";
import searchLogo from "../images/searchLogo.png";
import { sendTweet } from "./../../../servics/tweetService";
import AnalysisIcon from "./wordAnalysis";
import WordCloud from "./wordCloud";
import Doughnutt from "../../Graphs/Doughnut";
import ReactLoading from "react-loading";
import BasicMap from "./../../Graphs/map";
import Lines from "./../../Graphs/line";

class TweetsRender extends Form {
  state = {
    searchQuery: "",
    data: { search: "" },
    errors: {},
    tweets: { timeline: [] },
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
    let reset = { timeline: [] };
    this.setState({ tweets: reset });
    this.setState(this.state.data);
    this.setState({ clicked });
    console.log(this.state.data, "gggg", this.state.data.search);
    const { data: tweets } = await sendTweet(
      `/hashtags/${this.state.data.search}`
    );
    //const {data: tweets}=await getTweets();

    this.setState({ tweets });
    console.log("here what back", tweets);
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
          <div style={{ marginBottom: 55 }}>
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
        {console.log(
          this.state.tweets.timeline.length,
          "this.state.tweets.timeline.length"
        )}

        {this.state.tweets.timeline.length < 1 &&
          (this.state.clicked && (
            <div
              style={{
                margin: "auto"
              }}
            >
              <ReactLoading
                type="bubbles"
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
        {this.state.tweets.timeline.length >= 1 && (
          <div className="container">
            <div className="row">
              <div className="col">
                <Lines
                  data={this.state.tweets.analysis.day_of_month}
                  name={"ACTIVE DAYS"}
                />
              </div>
              <div className="col">
                <Lines
                  data={this.state.tweets.analysis.day_of_week}
                  name={"ACTIVE DAYS IN WEEK"}
                />
              </div>
              <div className="col">
                <Lines
                  data={this.state.tweets.analysis.hours}
                  name={"ACTIVE HOURS"}
                />
              </div>
            </div>
          </div>
        )}
        {this.state.tweets.timeline.length >= 1 && (
          <div>
            <div
              style={{
                width: 500,
                height: 400,
                marginLeft: 420,
                marginTop: 50,
                margin: "auto"
              }}
            >
              {console.log(this.state.tweets, "77")}
              <AnalysisIcon data={this.state.tweets.analysis.freq_tweet_app} />
              <Doughnutt data={this.state.tweets.analysis.freq_tweet_type} />
            </div>
            <WordCloud words={this.state.tweets.analysis.freq_tweet_hashtag} />
            {console.log(
              this.state.tweets.timeline,
              "this.state.tweets.timeline"
            )}
            <Tweets tweet={this.state.tweets.timeline} />
          </div>
        )}
        {this.state.tweets.timeline.length >= 1 && (
          <BasicMap data={this.state.tweets.analysis.distribution} />
        )}
      </React.Fragment>
    );
  }
}

export default TweetsRender;
