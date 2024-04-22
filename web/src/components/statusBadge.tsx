import { PostStatusEnums } from "../utils/enums";

interface IStatusBadge {
  status: PostStatusEnums;
}

export default function StatusBadge({ status }: IStatusBadge) {
  if (status === PostStatusEnums.DRAFT)
    return (
      <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
        {PostStatusEnums.DRAFT}
      </span>
    );

  return (
    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
      {PostStatusEnums.PUBLISHED}
    </span>
  );
}
