import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import blogsService from "../services/blogsService";
import MyPostCard from "../components/mypostCard";
import IMyBlogCard from "../interfaces/IMyBlogCard";
import { useNavigate } from "react-router-dom";

export default function MyPosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IMyBlogCard[]>([]);

  useEffect(() => {
    const getMyblogs = async () => {
      const items: IMyBlogCard[] = await blogsService.getMyBlogs();
      setPosts(items);
    };

    getMyblogs();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="px-4 h-10 w-fit border rounded-md text-white hover:bg-indigo-300 bg-indigo-600 flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/myblogs/new")}
      >
        <PlusIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
        New Blog
      </button>

      <div className="flex">
        {posts.map((post, key) => (
          <MyPostCard key={key} {...post} />
        ))}
      </div>
    </div>
  );
}
