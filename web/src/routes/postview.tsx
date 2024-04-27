import { useParams, useNavigate } from "react-router-dom";
import PostDetail from "../components/postDetail";
import { useEffect, useState } from "react";
import IPostModel from "../interfaces/IPostModel";
import { useLoadingDispatch } from "../context/LoadingContext";
import postService from "../services/postService";

export default function PostView() {
  const dispatchLoading = useLoadingDispatch();
  const [post, setPost] = useState<IPostModel>();
  const navigate = useNavigate();
  const { id } = useParams();
  const idInt = parseInt(id);

  useEffect(() => {
    if (isNaN(idInt)) {
      navigate("/");
    } else {
      const init = async () => {
        try {
          dispatchLoading({ type: "loading-on" });
          const result = await postService.getPostById(idInt);
          dispatchLoading({ type: "loading-off" });
          setPost(result);
        } catch (e) {
          dispatchLoading({ type: "loading-off" });
          navigate("/");
        }
      };
      init();
    }
  }, []);

  return <PostDetail {...post} />;
}
