import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const getAlbums = (userId: number) => {
  return axios.get(`${BASE_URL}/albums?userId=${userId}`);
}

export const getAlbumById = (id: number) => {
  return axios.get(`${BASE_URL}/albums/${id}`);
}