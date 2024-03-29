import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const getAlbumsPhotos = (albumId: number) => {
  return axios.get(`${BASE_URL}/albums/${albumId}/photos`);
};
