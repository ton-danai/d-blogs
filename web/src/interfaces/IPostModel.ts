import { PostStatusEnums } from "../utils/enums";

export default interface IPostModel {
  id?: number;
  title: string;
  category_id: number | null | string;
  category_name?: string;
  content: string;
  status: PostStatusEnums;
  publish_date?: Date | null | undefined;
  author?: string;
}
