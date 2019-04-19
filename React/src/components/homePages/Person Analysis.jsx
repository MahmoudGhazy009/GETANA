import React from "react";
import Joi from "joi-browser";
import Form from "./component/form";
import searchLogo from "./images/searchLogo.png";
import UserBio from "./component/userBio";
import ProgressBars from "./../charts/progressBar";

import { sendTweet } from "./../../servics/tweetService";
import { Redirect } from "react-router-dom";
import Piee from "../Graphs/pie";
import BasicMap from "./../Graphs/map";
import Doughnutt from "./../Graphs/Doughnut";
import Card from "./component/tweetCard";
import FlippingCardPage from "./component/cardFlip";
class PersonAnalysis extends Form {
  state = {
    searchQuery: "",
    clicked: false,

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
    this.setState({ clicked });

    this.setState(this.state.data);
    //this.setState({ clicked });

    const { data: tweets } = await sendTweet("/Person", this.state.data);
    // const {data: tweets}=await getTweets();

    this.setState({ tweets });
    console.log("here what back", tweets, tweets.length);
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
        {/* <BasicMap />*/}
        {this.state.tweets.followers > 2 && (
          <FlippingCardPage
            numTweets={this.state.tweets["num_tweets"]}
            likes={this.state.tweets.likes}
            following={this.state.tweets.following}
            followers={this.state.tweets.followers}
            profilePic={this.state.tweets["profile pic"]}
            userId={this.state.tweets.userId}
            screenName={this.state.tweets.screenName}
          />
        )}
        {console.log(this.state.tweets, "hhhh")}
        {this.state.tweets.followers > 2 && (
          <div
            style={{
              paddingLeft: 40,
              border: "1px solid #e1e8ed",
              borderRadius: 5,
              margin: "auto",
              width: 500,
              padding: 2,
              marginBottom: 15
            }}
          >
            <form className="form-inline">
              <div className="form-group mx-sm-3 mb-2">
                <h3>progressreply</h3>
              </div>
            </form>
            <form className="form-inline">
              {this.state.tweets.progressreply.map((item, index) => (
                <div className="row ">
                  <div className="col-6">
                    <div>
                      <ProgressBars label={item.user} value={item.value} />
                    </div>
                  </div>
                  <div className="col-6">
                    <h3 style={{ marginLeft: 200 }}>{item.value}</h3>
                  </div>
                </div>
              ))}
            </form>
          </div>
        )}
        {this.state.tweets.followers > 2 && (
          <div
            style={{
              paddingLeft: 40,
              border: "1px solid #e1e8ed",
              borderRadius: 5,
              margin: "auto",
              width: 500,
              padding: 2,
              marginBottom: 15
            }}
          >
            <form className="form-inline">
              <div className="form-group mx-sm-3 mb-2">
                <h3>progressretweet</h3>
              </div>
            </form>
            <form className="form-inline">
              {this.state.tweets.progressretweet.map((item, index) => (
                <div className="row ">
                  <div className="col-6">
                    <div>
                      <ProgressBars label={item.user} value={item.value} />
                    </div>
                  </div>
                  <div className="col-6">
                    <h3 style={{ marginLeft: 200 }}>{item.value}</h3>
                  </div>
                </div>
              ))}
            </form>
          </div>
        )}

        {this.state.tweets.followers > 2 && (
          <div
            style={{
              paddingLeft: 40,
              border: "1px solid #e1e8ed",
              borderRadius: 5,
              margin: "auto",
              width: 500,
              padding: 2,
              marginBottom: 15
            }}
          >
            <form className="form-inline">
              <div className="form-group mx-sm-3 mb-2">
                <h3>progressquoted</h3>
              </div>
            </form>
            <form className="form-inline">
              {this.state.tweets.progressquoted.map((item, index) => (
                <div className="row">
                  <div className="col-6">
                    <div>
                      <ProgressBars label={item.user} value={item.value} />
                    </div>
                  </div>

                  <div className="col-6">
                    <h3 style={{ marginLeft: 200 }}>{item.value}</h3>
                  </div>
                </div>
              ))}
            </form>
          </div>
        )}
        {this.state.tweets.followers > 2 && (
          <div>
            <h1>followers</h1>
            <h1>{this.state.tweets.followers} </h1>
            <h1>num_tweets</h1>
            <h1>{this.state.tweets["num_tweets"]} </h1>
            <h1>likes</h1>
            <h1>{this.state.tweets.likes} </h1>
            <h1>total number of tweets</h1>
            <h1>{this.state.tweets["total number of tweets"]} </h1>
            <h1>retweet_count</h1>
            <h1>{this.state.tweets["retweet_count"]} </h1>
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
                  <ProgressBars />
                </div>
                <span>COUNT</span>
              </form>
              <Piee data={this.state.tweets.content} />
              <Doughnutt data={this.state.tweets["tweet_type"]} />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default PersonAnalysis;
