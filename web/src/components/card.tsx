import { PostStatusEnums } from "../utils/enums";

export interface ICard {
  title: string;
  status: PostStatusEnums;
  content: string;
  category: string;
  author: string;
}

export default function Card(props: ICard) {
  return <div>{props.title || "CARD"}</div>;
}
