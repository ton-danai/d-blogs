import IPostModel from "../interfaces/IPostModel";
import { useNavigate } from "react-router-dom";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useUser } from "../context/UserContext";

export default function Card(props: IPostModel) {
  const navigate = useNavigate();
  const user = useUser();
  return (
    <div
      onClick={() => navigate("/post/" + props.id)}
      className="border rounded-md shadow-lg p-4  hover:bg-indigo-200 cursor-pointer flex-[1_0_25%] flex flex-col justify-between"
    >
      <div className="text-purple-500 font-bold mb-2  ">
        {props.category_name}
      </div>
      <div className="mb-3 text-lg text-gray-700 h-fit max-h-20 text-ellipsis overflow-hidden ">
        {props.title}
      </div>
      <div>
        <div className="mb-1 flex flex-row gap-2">
          {user.liked_posts.includes(props.id) ? (
            <HeartIconSolid className={`w-6 h-6  text-red-500`} />
          ) : (
            <HeartIconOutline className={`w-6 h-6  text-gray-500`} />
          )}
          {props.likes}
        </div>
        <div className="text-gray-500 text-sm">Author : {props.author}</div>
      </div>
    </div>
  );
}
