import dayjs from "dayjs";
import IPostModel from "../interfaces/IPostModel";
import {
  FacebookShareButton,
  LineShareButton,
  FacebookIcon,
  LineIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useUser, useUserDispatch } from "../context/UserContext";
import postService from "../services/postService";
import userService from "../services/userService";
import { useState } from "react";

export default function PostDetail(props: IPostModel) {
  const user = useUser();
  const dispatchUser = useUserDispatch();
  const [toggleLike, setToggkeLike] = useState(0);

  const handleLike = async () => {
    try {
      await postService.like(props.id);
      const profile = await userService.getProfile();
      dispatchUser({ type: "set", payload: profile });
      setToggkeLike(toggleLike + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnLike = async () => {
    try {
      await postService.unlike(props.id);
      const profile = await userService.getProfile();
      dispatchUser({ type: "set", payload: profile });
      setToggkeLike(toggleLike - 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-2 py-4">
      <div className="max-w-6xl min-w-72 w-full flex flex-col">
        <div className="flex justify-between items-start">
          <h5 className="font-bold text-wrap text-xl">{props.title}</h5>
          <div className="p-2 rounded-md bg-amber-600 text-gray-200">
            {props.category_name}
          </div>
        </div>
        <div
          className="my-5"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
        <div className="mb-3 flex flex-row gap-2">
          {user.liked_posts.includes(props.id) ? (
            <HeartIconSolid
              onClick={handleUnLike}
              className={`w-6 h-6 cursor-pointer text-red-500`}
            />
          ) : (
            <HeartIconOutline
              onClick={handleLike}
              className={`w-6 h-6 cursor-pointer text-gray-500`}
            />
          )}
          {props.likes + toggleLike}
        </div>
        <hr />
        <div className="flex flex-row gap-2 my-3">
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LineShareButton url={window.location.href}>
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <TwitterShareButton url={window.location.href}>
            <XIcon size={32} round={true} />
          </TwitterShareButton>
        </div>

        <div>Author : {props.author}</div>
        <div>
          Publish :
          {props.publish_date
            ? dayjs(props.publish_date).format("DD-MMM-YYYYTHH:mm:ssZ[Z]")
            : ""}
        </div>
      </div>
    </div>
  );
}
