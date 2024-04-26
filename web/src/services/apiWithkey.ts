import axios from "axios";
import Cookies from "universal-cookie";

export const getInstant = () => {
  const cookies = new Cookies();
  const access_token = cookies.get("profile");
  const instant = axios.create({
    headers: {
      authorization: "Bearer " + access_token,
    },
  });

  return instant;
};

export default {
  getInstant,
};
