import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import postService from "../services/postService";
import MyPostCard from "../components/mypostCard";
import IMyPostCard from "../interfaces/IMyPostCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useLoadingDispatch } from "../context/LoadingContext";
import { useMessageModalDispatch } from "../context/MessageModalContext";

export default function MyPosts() {
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const dispatchLoading = useLoadingDispatch();
  const dispatchMsgModal = useMessageModalDispatch();
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

  const removePostFromList = (id: number) => {
    const list = [...posts.filter((e) => e.id != id)];
    setPosts(list);
  };

  const filterData = (data: IMyPostCard) => {
    const txt = filterText.toLocaleLowerCase();
    if (data.title.toLocaleLowerCase().includes(txt)) {
      return true;
    }

    if (data.category_name.toLocaleLowerCase().includes(txt)) {
      return true;
    }

    if (data.status.toLocaleLowerCase().includes(txt)) {
      return true;
    }

    return false;
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-4xl min-w-72 w-full flex flex-col gap-2">
        <button
          type="button"
          className="px-4 h-10 w-fit border rounded-md text-white hover:bg-indigo-300 bg-indigo-600 flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/myposts/new")}
        >
          <PlusIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
          NEW POST
        </button>
        <div className="my-4">
          <input
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
            required
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </div>

        {posts.filter(filterData).map((post, key) => (
          <MyPostCard
            key={key}
            onClickEdit={() => navigate("/myposts/" + post.id)}
            onClickDelete={async () => {
              try {
                dispatchLoading({ type: "loading-on" });
                await postService.removeById(post.id);
                removePostFromList(post.id);
                dispatchLoading({ type: "loading-off" });
              } catch (e) {
                dispatchLoading({ type: "loading-off" });
                dispatchMsgModal({
                  type: "show",
                  payload: {
                    header: "Error",
                    detail: "Something went wrong",
                    btnText: "OK",
                    onClick: () => {},
                  },
                });
              }
            }}
            {...post}
          />
        ))}
        {posts.filter(filterData).length <= 0 ? (
          <div className="flex w-full justify-center items-center">
            No data found
          </div>
        ) : null}
      </div>
    </div>
  );
}
