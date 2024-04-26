import axios from "axios";
import { API_URL } from "../utils/constant";

interface ILoginResult {
  email: string;
  access_token: string;
}

const signin = async (
  email: string,
  password: string
): Promise<ILoginResult> => {
  const result = await axios.post(API_URL + "/auth/login", {
    username: email,
    password: password,
  });
  return result.data;
};

export default {
  signin,
};
