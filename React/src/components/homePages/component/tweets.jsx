import React, { Component } from "react";
import Like from "./tweetsIcon/like";
class Tweets extends Component {
  state = {
   
  };
  render() {
    let {tweet}=this.props;
    console.log(this.props,'props');
    console.log(tweet[0].name,'tweet');
    console.log(this.props.tweet[0].name,'tweet');
    return (
      <div>
      {
        tweet.map((item,index)=>(
      <div
        className="card text-black bg-light"
        style={{
          maxWidth: 500,
          marginLeft: 70,
          marginTop: 100,
          margin: "auto",
          marginBottom:40
        }}
      >
        <div className="card-header row">
          <div className="column">
            <img
              className="rounded-circle "
              src={item['user_pic']}
              alt="name"
              style={{
                maxWidth: 70,
                maxHeight: 70,
                verticalAlign: "middle"
              }}
            />
          </div>
          <div className="column">
            <h4 style={{ marginLeft:20,marginTop:5 }}>{item.name}</h4>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">
           {item.tweet}
          </p>
        </div>
        <Like like={item.likes} retweet={item['retweet_count']}/>
        <br>
      </br >
      </div>
      
    
    ))}</div>
    );
  }
}

export default Tweets;
