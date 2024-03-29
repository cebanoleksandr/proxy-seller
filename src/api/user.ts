import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const getUsers = () => {
  return axios.get(`${BASE_URL}/users`);
}

export const getUserById = (id: number) => {
  return axios.get(`${BASE_URL}/users/${id}`);
}
