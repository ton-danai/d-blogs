import { PostStatusEnums } from "../utils/enums";

export default interface IMyBlogCard {
  id: number;
  title: string;
  status: PostStatusEnums;
  category: string;
  publicationDate: Date | null;
}
