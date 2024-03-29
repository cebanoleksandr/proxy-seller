import axios from "axios"
import { BASE_URL } from "./baseUrl"

export const getComments = (postId: number) => {
  return axios.get(`${BASE_URL}/comments?postId=${postId}`);
}
