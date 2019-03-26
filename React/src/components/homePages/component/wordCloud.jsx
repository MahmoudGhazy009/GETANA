import React, { Component } from 'react';
import ReactWordcloud from "react-wordcloud";
 
let wordss = [
 
];
 


class WordCloud extends Component {
  

  render() {
    let {words}=this.props;
    Object.entries(words).map(([key, value]) => {wordss.push({text:key,value:value});});
    

    return (
      <div >
         
<ReactWordcloud  words={wordss} />
    </div>
    );
  }
}

export default WordCloud;
