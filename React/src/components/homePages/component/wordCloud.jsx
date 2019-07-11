import React, { Component } from "react";
import ReactWordcloud from "react-wordcloud";

let wordss = [];

class WordCloud extends Component {
  render() {
    let { words } = this.props;
    wordss = [];
    Object.entries(words).map(([key, value]) => {
      wordss.push({ text: key, value: value });    console.log(wordss.length,key,'momomo')

    });
    console.log(wordss.length,'momomo')

    return (
      <div  style={{marginLeft:"auto"}}>
        <ReactWordcloud words={wordss} />
      </div>
    );
  }
}

export default WordCloud;
