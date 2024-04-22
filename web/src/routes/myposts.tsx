import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import blogsService from "../services/blogsService";
import MyPostCard, { IMyPostCard } from "../components/mypostCard";
import { useNavigate } from "react-router-dom";

export default function MyPosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IMyPostCard[]>([]);

  useEffect(() => {
    const getMypost = async () => {
      const items: IMyPostCard[] = await blogsService.getMyPosts();
      setPosts(items);
    };

    getMypost();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="px-4 h-10 w-fit border rounded-full text-white hover:bg-indigo-300 bg-indigo-600 flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/myposts/new")}
      >
        <PlusIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
        New Post
      </button>

      <div className="flex">
        {posts.map((post, key) => (
          <MyPostCard key={key} {...post} />
        ))}
      </div>
    </div>
  );
}
