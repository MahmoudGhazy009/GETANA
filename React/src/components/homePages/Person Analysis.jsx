import React from "react";
import Joi from "joi-browser";
import Form from "./component/form";
import searchLogo from "./images/searchLogo.png";
import logo2 from "./images/watchman.png";
import { Button } from 'react-bootstrap';
import UserBio from "./component/userBio";
import ProgressBars from "./../charts/progressBar";
import ReactLoading from "react-loading";

import { sendTweet } from "./../../servics/tweetService";
import { Redirect } from "react-router-dom";
import BasicMap from "./../Graphs/map";
import Doughnutt from "./../Graphs/Doughnut";
import Card from "./component/tweetCard";
import FlippingCardPage from "./component/cardFlip";
import WordCloud from "./component/wordCloud";
import AnalysisIcon from "./component/wordAnalysis";
import Lines from "../Graphs/line";
import Tweets from "./component/tweets";
import Piee from "./../Graphs/pie";
import Bounce from 'react-reveal/Bounce';
class PersonAnalysis extends Form {
  state = {
    searchQuery: "",
    clicked: false,

    data: { search: "" },
    errors: {},
    tweets: { timeline: [] }
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
            src={logo2}
            alt="searchLogo"
            style={{ paddingTop: 80, paddingBottom: 10 }}
          />
          <div style={{ marginBottom: 0 }}>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("search")}
              <div
               style={{ marginLeft:"13%"}}
              >
                <Bounce duration={1000} forever  cascade>
                {this.renderButton("Search")}
                </Bounce>
             
              </div>
            </form>
          </div>
        </div>
        {/* <BasicMap />*/}
        {this.state.tweets.timeline.length < 1 &&
          (this.state.clicked && (
            <div
              style={{
                marginLeft:"45%"
              }}
            >
              <ReactLoading
                type="bubbles"
                color="#2e98cc"
                height={100}
                width={120}
                
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
          <FlippingCardPage
            numTweets={this.state.tweets.cards.num_tweets}
            following={this.state.tweets.cards.following}
            followers={this.state.tweets.cards.followers}
            profilePic={this.state.tweets.cards.profile_pic}
            screenName={this.state.tweets.cards.screen_name}
            userId={this.state.tweets.cards.name}
            profile_banner={this.state.tweets.cards.profile_banner}
            profile_url={this.state.tweets.cards.profile_url}
            likes={this.state.tweets.cards.likes}
          />
        )}

        {/*this.state.tweets.timeline.length >= 1 && (
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
        )*/}
        {this.state.tweets.timeline.length >= 1 && (
          <div>
            <div
              style={{
                width: 500,
                marginLeft: 420,
                marginTop: 0,
                margin: "auto"
              }}
            >
              <Lines
                data={this.state.tweets.analysis.day_of_month}
                name={"ACTIVE DAYS"}
              />
              <Lines
                data={this.state.tweets.analysis.day_of_week}
                name={"ACTIVE DAYS IN WEEK"}
              />
              <Lines
                data={this.state.tweets.analysis.hours}
                name={"ACTIVE HOURS"}
              />
              {console.log(this.state.tweets, "77")}
              
              
            </div>
            {console.log(
              this.state.tweets.timeline,
              "this.state.tweets.timeline"
            )}
            <Bounce duration={1000}  cascade><div style={{borderTop: "1px solid #ddd"}}><Button  style={{marginLeft:"45%"}} variant="warning" size="sm"><Bounce duration={1000} forever  cascade><h5 style={{fontFamily:"Nanum Pen Script, cursive"}}>Word Cloud</h5></Bounce></Button> </div></Bounce>
            <WordCloud words={this.state.tweets.analysis.freq_tweet_hashtag} />
            <div style={{height:"40px"}}></div>

            <Bounce duration={1000}  cascade><div style={{borderTop: "1px solid #ddd"}}><Button  style={{marginLeft:"45%"}} variant="warning" size="sm"><Bounce duration={1000} forever  cascade><h5 style={{fontFamily:"Nanum Pen Script, cursive"}}>Engagment</h5></Bounce></Button> </div></Bounce>
            <Doughnutt data={this.state.tweets.analysis.freq_tweet_type} />
            <div className="row" style={{fontFamily:"Nanum Pen Script, cursive",width:"50%",marginLeft:"37%"}}>

        <div className="col-md-2">  
        <h3 style={{color:"violet"}}>{this.state.tweets.analysis.freq_tweet_type.tweet}</h3>
        <span >tweet</span>
        </div>

        <div className="col-md-2">
        <h3 style={{color:"red"}}>{this.state.tweets.analysis.freq_tweet_type.retweet}</h3>
        <span>retweet</span>
        </div>

        <div className="col-md-2">  
        <h3 style={{color:"purple"}}>{this.state.tweets.analysis.freq_tweet_type.reply}</h3>
        <span>reply</span>
        </div>

        <div className="col-md-2">
        <h3 style={{color:"blue"}}>{this.state.tweets.analysis.freq_tweet_type.quote}</h3>
        <span>quote</span>
        </div>

      </div>

      <div style={{height:"60px"}}></div>  
            
            <Bounce duration={1000}  cascade><div style={{borderTop: "1px solid #ddd"}}><Button  style={{marginLeft:"43%"}} variant="warning" size="sm"><Bounce duration={1000} forever  cascade><h5 style={{fontFamily:"Nanum Pen Script, cursive"}}>Frequent Content</h5></Bounce></Button> </div></Bounce>
            <div
              style={{
                width: 550,
                marginLeft:"33%"
              }}
            >
              <Piee data={this.state.tweets.analysis.freq_tweet_content} />
            </div>
            <div style={{height:"60px"}}></div>
            <ProgressBars
              data={this.state.tweets.analysis.most_quoted_user}
              name="Most Quoted User"
            />

            <ProgressBars
              data={this.state.tweets.analysis.most_replied_user}
              name="Most Replied User"
            />

            <ProgressBars
              data={this.state.tweets.analysis.most_retweeted_user}
              name="Most Retweeted User"
            />
            <div style={{height:"60px"}}></div>
            <Bounce duration={1000}  cascade><div style={{borderTop: "1px solid #ddd"}}><Button  style={{marginLeft:"45%"}} variant="warning" size="sm"><Bounce duration={1000} forever  cascade><h5 style={{fontFamily:"Nanum Pen Script, cursive"}}>Frequent App</h5></Bounce></Button> </div></Bounce>
              <div style={{height:"20px" }}></div>
              <div style={{marginLeft:"13%", marginBottom:20}}>
            <AnalysisIcon data={this.state.tweets.analysis.freq_tweet_app} />
            </div>
            <Bounce duration={1000}  cascade><div style={{borderTop: "1px solid #ddd"}}><Button  style={{marginLeft:"47.5%"}} variant="warning" size="sm"><Bounce duration={1000} forever  cascade><h5 style={{fontFamily:"Nanum Pen Script, cursive"}}>Tweets</h5></Bounce></Button> </div></Bounce>
              <div style={{height:"60px"}}></div>
            <Tweets tweet={this.state.tweets.timeline} />
            
          </div>
        )}
        {/*this.state.tweets.timeline.length >= 1 && (
          <BasicMap data={this.state.tweets.analysis.distribution} />
        )*/}
      </React.Fragment>
    );
  }
}

export default PersonAnalysis;
