import { IMyPostCard } from "../components/mypostCard";
import { PostStatusEnums } from "../utils/enums";

const myPosts: IMyPostCard[] = [
  {
    id: 1,
    title: "test1 asdwdasd asdaws asdjlkjklj kljkljlk jlkj lkjlkj",
    status: PostStatusEnums.DRAFT,
    category: "Music",
    publicationDate: null,
  },
];

const getMyPosts = async (): Promise<IMyPostCard[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(myPosts);
    }, 3000);
  });
};

export default {
  getMyPosts,
};
