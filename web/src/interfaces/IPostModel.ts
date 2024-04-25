import { PostStatusEnums } from "../utils/enums";

export default interface IPostModel {
  title: string;
  categoryId: number | string | null;
  status: PostStatusEnums;
  content: string;
}
