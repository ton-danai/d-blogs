import { PostStatusEnums } from "../utils/enums";

export default interface IMyPostCard {
  id: number;
  title: string;
  status: PostStatusEnums;
  category: string;
  publicationDate: Date | null;
}
