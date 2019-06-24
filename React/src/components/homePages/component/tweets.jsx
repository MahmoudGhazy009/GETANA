import React, { Component } from "react";
import Like from "./tweetsIcon/like";
import Paginations from "./paginates";
import paginate from "./paginate";
import SelectTweet from "./selectTweet";

class Tweets extends Component {
  state = {
    pageSize: 10,
    currentPage: 1,
    types: ["All", "POS", "NEG"],
    tweet: this.props.tweet,
    root: this.props.tweet,
    selectedType: null
  };
  getPagedData = () => {
    const { pageSize, currentPage, tweet } = this.state;
    const data = paginate(tweet, currentPage, pageSize);

    return { data };
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre => {
    const { root } = this.state;
    let filtered = { ...root };
    if (genre === "POS") filtered = root.filter(m => m.sentiment === 1);
    else if (genre === "NEG") filtered = root.filter(m => m.sentiment === 0);
    else if (genre == "All") filtered = root;

    this.setState({ tweet: filtered, selectedType: genre });
  };

  render() {
    const { data: tweet } = this.getPagedData();
    console.log(tweet, "hioioi");
    return (
      <div>
        <SelectTweet
          items={this.state.types}
          selectedItem={this.state.selectedType}
          onItemSelect={this.handleGenreSelect}
        />
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
              <div className="column">
                <h4 style={{ marginLeft: 20, marginTop: 5 }}>
                  <a
                    style={{ textDecoration: "none" }}
                    href={item["user_url"]}
                    target="_blank"
                  />
                  <i
                    className={
                      "fa fa-" +
                      (item.sentiment === 1 ? "plus-circle" : "minus-circle")
                    }
                    style={{
                      color: item.sentiment === 1 ? "green" : "red",
                      position: "relative",
                      right: 0
                    }}
                  />
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
                {item.photo[item.photo.length - 1] != "#" && (
                  <img src={item.photo[item.photo.length - 1]} />
                )}
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
