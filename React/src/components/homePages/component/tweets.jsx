import React, { Component } from "react";
import Like from "./tweetsIcon/like";
import Paginations from "./paginates";
import paginate from "./paginate";

class Tweets extends Component {
  state = { pageSize: 10, currentPage: 1, tweet: this.props.tweet };
  getPagedData = () => {
    const { pageSize, currentPage, tweet } = this.state;

    const movies = paginate(tweet, currentPage, pageSize);

    return { movies };
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  render() {
    const { movies: tweet } = this.getPagedData();
    console.log(tweet);
    return (
      <div>
        {tweet.map((item, index) => (
          <div
            key={index}
            className="card text-black bg-light"
            style={{
              maxWidth: 500,
              marginLeft: 70,
              marginTop: 100,
              margin: "auto",
              marginBottom: 40
            }}
          >
            <div className="card-header row">
              <div className="column">
                <img
                  className="rounded-circle "
                  src={item["user_pic"]}
                  alt="name"
                  style={{
                    maxWidth: 70,
                    maxHeight: 70,
                    verticalAlign: "middle"
                  }}
                />
              </div>
              <div className="column">
                <h4 style={{ marginLeft: 20, marginTop: 5 }}>
                  <a
                    style={{ textDecoration: "none" }}
                    href={item["user_url"]}
                    target="_blank"
                  >
                    {item.name}
                  </a>
                </h4>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">
                <a
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  href={item["tweet_url"]}
                >
                  {item.tweet}
                </a>
              </p>
            </div>
            <Like like={item.likes} retweet={item["retweet_count"]} />
            <br />
          </div>
        ))}
        <div style={{ marginLeft: 580 }}>
          <Paginations
            itemsCount={this.state.tweet.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Tweets;
