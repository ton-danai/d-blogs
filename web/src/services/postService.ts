import IPostModel from "../interfaces/IPostModel";
import IMyPostCard from "../interfaces/IMyPostCard";
import { PostStatusEnums } from "../utils/enums";

const myPosts: IMyPostCard[] = [
  {
    id: 1,
    title: "test1 asdwdasd asdaws asdjlkjklj kljkljlk jlkj lkjlkj",
    status: PostStatusEnums.DRAFT,
    category: "1",
    publicationDate: null,
  },
];

const getPostById = async (id: number): Promise<IPostModel> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const data = myPosts.find((e) => e.id === id);
      resolve({
        title: data.title,
        content: "Dummy",
        categoryId: parseInt(data.category),
        status: data.status,
      });
    }, 3000);
  });
};

const getMyPosts = async (): Promise<IMyPostCard[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(myPosts);
    }, 3000);
  });
};

const add = async (model: IPostModel): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      myPosts.push({
        id: 2,
        title: model.title,
        status: model.status,
        category: model.categoryId.toString(),
        publicationDate: null,
      });
      resolve();
    }, 3000);
  });
};

const edit = async (id: number, model: IPostModel): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const data = myPosts.find((e) => e.id === id);
      data.title = model.title;
      data.category = model.categoryId.toString();
      data.status = model.status;
      resolve();
    }, 3000);
  });
};

export default {
  getPostById,
  getMyPosts,
  add,
  edit,
};
