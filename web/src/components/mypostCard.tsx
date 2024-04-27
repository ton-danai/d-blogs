import IMyPostCard from "../interfaces/IMyPostCard";
// import { HeartIcon } from "@heroicons/react/24/solid";
import StatusBadge from "./statusBadge";
import dayjs from "dayjs";

export default function MyPostCard(props: IMyPostCard) {
  return (
    <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h6 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600 dark:text-white text-ellipsis overflow-hidden ">
        {props.category_name}
      </h6>
      <div className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden">
        {props.title}
      </div>
      <div className="pt-3 flex w-full flex-row gap-3">
        <StatusBadge status={props.status} />
        <div className=" text-gray-400 text-sm">
          {props.publish_date
            ? dayjs(props.publish_date).format("DD-MMM-YYYYTHH:mm:ssZ[Z]")
            : ""}
        </div>
      </div>
      <div className="pt-3 flex w-full flex-row">
        {/* <div className="flex gap-2 text-gray-400 text-sm">
          <div className="flex">
            <HeartIcon className="w-5 h-5 text-red-400 mr-1" /> {0}
          </div>
          |<div>{0} Comments</div>
        </div> */}
        <button
          type="button"
          onClick={props.onClickEdit}
          className="text-white bg-cyan-500 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={props.onClickDelete}
          className="text-white bg-red-400 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
