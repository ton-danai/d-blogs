import axios from "axios";
import { API_URL } from "../utils/constant";
import { getInstant } from "./apiWithkey";

const register = async (email: string, password: string): Promise<void> => {
  return axios.post(API_URL + "/users", {
    email: email,
    password: password,
  });
};

const getProfile = async () => {
  const instant = getInstant();
  const result = await instant.get(API_URL + "/users/profile");

  return result.data;
};

export default {
  register,
  getProfile,
};
