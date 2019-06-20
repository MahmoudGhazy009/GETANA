import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies(link) {
  return http.get(apiEndpoint + link);
}
export function getCart(link) {
  return http.get(apiEndpoint + link);
}
export function getToken(url, body) {
  return http.post(url, body);
}
export function addBook(url, body) {
  return http.post(apiEndpoint + url, body);
}
export function addCart(url, body) {
  return http.patch(apiEndpoint + url, body);
}
export function update(url, id, body) {
  return http.patch(apiEndpoint + url + "/" + id, body);
}
export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}

export function deleteBook(url, id) {
  return http.delete(apiEndpoint + url + "/" + id);
}
