import IDropdownList from "../interfaces/IDropdownList";
import axios from "axios";
import { API_URL } from "../utils/constant";

const getCategories = async (): Promise<IDropdownList[]> => {
  const result = await axios.get(API_URL + "/masterdata/categories");

  return result.data.categories;
};

export default {
  getCategories,
};
