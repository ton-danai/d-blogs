import { PostStatusEnums } from "../utils/enums";

export default interface IMyPostCard {
  id: number;
  title: string;
  status: PostStatusEnums;
  category_id: number;
  category_name: string;
  publicationDate: Date | null;
}
