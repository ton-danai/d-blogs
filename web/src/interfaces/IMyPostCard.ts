import { PostStatusEnums } from "../utils/enums";

export default interface IMyPostCard {
  id: number;
  title: string;
  status: PostStatusEnums;
  category_id: number;
  category_name: string;
  publish_date: Date | null;
  onClickEdit?: () => void | undefined;
  onClickDelete?: () => void | undefined;
}
