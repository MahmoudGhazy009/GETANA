import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/HashTag";

function tweetUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTweets() {
  return http.get(apiEndpoint);
}

export function getTweet(tweetId) {
  return http.get(tweetUrl(tweetId));
}

export function sendTweet(url, word) {
  return http.post(apiUrl + url, word);
}

export function deleteTweet(tweetId) {
  return http.delete(tweetUrl(tweetId));
}
