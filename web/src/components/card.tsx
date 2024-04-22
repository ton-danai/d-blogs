export interface ICard {
  title: string;
  status: string;
  content: string;
  category: string;
  author: string;
}

export default function Card(props: ICard) {
  return <div>{props.title || "CARD"}</div>;
}
