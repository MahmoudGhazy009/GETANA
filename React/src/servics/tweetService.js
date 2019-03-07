import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/hashTag";

function tweetUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTweets() {
  return http.get(apiEndpoint);
}

export function getTweet(tweetId) {
  return http.get(tweetUrl(tweetId));
}

export function sendTweet(tweet) {
  if (tweet) {
    const body = { ...tweet };

    return http.put(apiEndpoint, body);
  }

  return http.post(apiEndpoint, tweet);
}

export function deleteTweet(tweetId) {
  return http.delete(tweetUrl(tweetId));
}
