import IPostModel from "../interfaces/IPostModel";
import IMyPostCard from "../interfaces/IMyPostCard";
import { getInstant } from "./apiWithkey";
import { API_URL } from "../utils/constant";
import axios from "axios";

const getPostByPage = async (
  page: number
): Promise<{ data: IPostModel[]; count: number }> => {
  const result = await axios.get(API_URL + "/posts?page=" + page);

  return result.data;
};

const getPostById = async (id: number): Promise<IPostModel> => {
  const result = await axios.get(API_URL + "/posts/" + id);

  return result.data;
};

const getMyPosts = async (): Promise<IMyPostCard[]> => {
  const instant = getInstant();
  const result = await instant.get(API_URL + "/posts/my");
  return result.data;
};

const add = async (model: IPostModel): Promise<void> => {
  const instant = getInstant();
  await instant.post(API_URL + "/posts", model);
};

const edit = async (id: number, model: IPostModel): Promise<void> => {
  const instant = getInstant();
  await instant.patch(API_URL + "/posts/" + id, model);
};

const removeById = async (id: number): Promise<void> => {
  const instant = getInstant();
  await instant.delete(API_URL + "/posts/" + id);
};

const like = async (id: number): Promise<void> => {
  const instant = getInstant();
  await instant.put(API_URL + "/posts/" + id + "/like");
};

const unlike = async (id: number): Promise<void> => {
  const instant = getInstant();
  await instant.put(API_URL + "/posts/" + id + "/unlike");
};

export default {
  getPostById,
  getMyPosts,
  add,
  edit,
  removeById,
  getPostByPage,
  like,
  unlike,
};
