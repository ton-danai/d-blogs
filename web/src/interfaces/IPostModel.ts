import { PostStatusEnums } from "../utils/enums";

export default interface IForm {
  title: string;
  categoryId: number | string | null;
  status: PostStatusEnums;
  content: string;
}
