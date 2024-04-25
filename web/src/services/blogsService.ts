import IBlogForm from "../interfaces/IBlogForm";
import IMyBlogCard from "../interfaces/IMyBlogCard";
import { PostStatusEnums } from "../utils/enums";

const myPosts: IMyBlogCard[] = [
  {
    id: 1,
    title: "test1 asdwdasd asdaws asdjlkjklj kljkljlk jlkj lkjlkj",
    status: PostStatusEnums.DRAFT,
    category: "Music",
    publicationDate: null,
  },
];

const getMyBlogs = async (): Promise<IMyBlogCard[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(myPosts);
    }, 3000);
  });
};

const addBlogs = async (model: IBlogForm): Promise<void> => {
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

export default {
  getMyBlogs,
  addBlogs,
};
