import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Switch from "../../components/statusSwitch";
import CategoryAutocomplete from "../../components/categoryAutocomplete";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PostStatusEnums } from "../../utils/enums";
import { useNavigate } from "react-router-dom";
import IForm from "../../interfaces/IBlogForm";
import blogsService from "../../services/blogsService";
import { useLoadingDispatch } from "../../context/LoadingContext";

export default function NewPost() {
  const dispatch = useLoadingDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({} as IForm);
  const [state, setState] = useState<IForm>({
    title: "",
    content: "",
    status: PostStatusEnums.DRAFT,
    categoryId: null,
  });

  const setStatus = (newValue: PostStatusEnums) => {
    setState({ ...state, status: newValue });
  };

  const validateState = () => {
    let valid = true;
    const errorData = {} as IForm;
    if (!state.title) {
      errorData.title = "Title is required.";
    }

    if (!state.content) {
      errorData.content = "Content is required.";
    }

    if (!state.categoryId) {
      errorData.categoryId = "Category is required.";
    }

    setErrors(errorData);
    valid = Object.keys(errorData).length <= 0;
    return valid;
  };

  const onSubmit = async () => {
    const canSubmit = validateState();

    if (canSubmit) {
      console.log("canSubmit", canSubmit);
      dispatch({ type: "loading-on" });
      try {
        await blogsService.addBlogs(state);
        dispatch({ type: "loading-off" });
      } catch (e) {
        dispatch({ type: "loading-off" });
        console.log(e);
      }
    }
  };

  const removeErrorByKey = (key) => {
    const errs = { ...errors };
    delete errs[key];
    setErrors(errs);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-4xl min-w-72 w-full">
        <h1 className="text-2xl mb-5 flex flex-row items-center">
          <ArrowLeftIcon
            className="w-5 h-5 mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />{" "}
          New Post
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            required
            value={state.title}
            onChange={(e) => {
              setState({ ...state, title: e.target.value });
              removeErrorByKey("title");
            }}
            maxLength={200}
          />
          {errors.title && <div className="text-red-600">{errors.title}</div>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="editor"
          >
            Content
          </label>

          <CKEditor
            id="editor"
            editor={ClassicEditor}
            data={state.content}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                const viewEditableRoot = editor.editing.view.document.getRoot();
                if (viewEditableRoot)
                  writer.setStyle("height", "300px", viewEditableRoot);
              });
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(_, editor) => {
              setState({ ...state, content: editor.getData() });
              removeErrorByKey("content");
            }}
          />
          {errors.content && (
            <div className="text-red-600">{errors.content}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="CategoryAutocomplete"
          >
            Category
          </label>
          <CategoryAutocomplete
            value={state.categoryId}
            onChange={(data) => setState({ ...state, categoryId: data.id })}
          />
          {errors.categoryId && (
            <div className="text-red-600">{errors.categoryId}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between flex-row max-md:flex-col">
          <div className="mb-2">
            <Switch value={state.status} onChange={setStatus} />
          </div>
          <div>
            <button
              type="button"
              onClick={onSubmit}
              className="w-20 max-md:w-full px-4 h-10 border rounded-md text-white hover:bg-indigo-300 bg-indigo-600 flex items-center justify-center cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
