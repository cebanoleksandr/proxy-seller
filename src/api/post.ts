import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const getPosts = (userId: number) => {
  return axios.get(`${BASE_URL}/posts?userId=${userId}`);
}

export const getPostById = (id: number) => {
  return axios.get(`${BASE_URL}/posts/${id}`);
}
