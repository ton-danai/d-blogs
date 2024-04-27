import IDropdownList from "../interfaces/IDropdownList";
import axios from "axios";
import { API_URL } from "../utils/constant";
import ITopTen from "../interfaces/ITopTen";

const getCategories = async (): Promise<IDropdownList[]> => {
  const result = await axios.get(API_URL + "/masterdata/categories");
  return result.data.categories;
};

const getCategoriesTopTen = async (): Promise<ITopTen[]> => {
  const result = await axios.get(API_URL + "/masterdata/categories/top10");
  return result.data;
};

export default {
  getCategories,
  getCategoriesTopTen,
};
