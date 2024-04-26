import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import postService from "../services/postService";
import MyPostCard from "../components/mypostCard";
import IMyPostCard from "../interfaces/IMyPostCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function MyPosts() {
  const navigate = useNavigate();
  const user = useUser();

  const [posts, setPosts] = useState<IMyPostCard[]>([]);

  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }

    const getMyPosts = async () => {
      const items: IMyPostCard[] = await postService.getMyPosts();
      setPosts(items);
    };

    getMyPosts();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="px-4 h-10 w-fit border rounded-md text-white hover:bg-indigo-300 bg-indigo-600 flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/myposts/new")}
      >
        <PlusIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
        NEW POST
      </button>

      <div className="flex">
        {posts.map((post, key) => (
          <MyPostCard key={key} {...post} />
        ))}
      </div>
    </div>
  );
}
