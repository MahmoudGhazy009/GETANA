import React from "react";

const Like = props => {
  let classes = "fa fa-heart-o";
  //if (!props.liked) classes += "-o";
  return (
    <div>
      <i
        onClick={props.onClick}
        style={{ margin: 10 }}
        className={classes}
        aria-hidden="true"
      >
        10
      </i>
      <i className="fa fa-retweet ml-4" aria-hidden="true">
        20
      </i>
    </div>
  );
};

export default Like;
