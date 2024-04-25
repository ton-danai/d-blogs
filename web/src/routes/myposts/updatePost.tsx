import PostForm from "../../components/postForm";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idInt = parseInt(id);
  if (!isNaN(idInt)) {
    return <PostForm mode="EDIT" id={idInt} />;
  } else {
    navigate("/");
  }
}
