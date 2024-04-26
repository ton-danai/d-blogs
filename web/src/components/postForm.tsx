import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IPostModel from "../interfaces/IPostModel";
import { PostStatusEnums } from "../utils/enums";
import CategoryAutocomplete from "./categoryAutocomplete";
import Switch from "./statusSwitch";
import { useLoadingDispatch } from "../context/LoadingContext";
import { useMessageModalDispatch } from "../context/MessageModalContext";
import postsService from "../services/postService";
import { useUser } from "../context/UserContext";

interface IPostModelTemp {
  mode: "ADD" | "EDIT";
  id?: number;
}

export default function PostForm(props: IPostModelTemp) {
  const dispatch = useLoadingDispatch();
  const dispatchMsgModal = useMessageModalDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({} as IPostModel);
  const [state, setState] = useState<IPostModel>({
    title: "",
    content: "",
    status: PostStatusEnums.DRAFT,
    category_id: null,
  });

  const [content, setContent] = useState("");
  const user = useUser();
  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }

    const initForm = async () => {
      if (props.mode === "EDIT" && props.id) {
        try {
          dispatch({ type: "loading-on" });
          const data = await postsService.getPostById(props.id);
          if (!data) navigate("/myposts");

          setState({ ...data, content: "" });
          setContent(data.content);
          dispatch({ type: "loading-off" });
        } catch (e) {
          dispatchMsgModal({
            type: "show",
            payload: {
              header: "Erorr on loading",
              detail: "Something went wrong.",
              btnText: "OK",
              onClick: () => {
                navigate("/myposts");
              },
            },
          });
        }
      }
    };

    initForm();
  }, []);

  const removeErrorByKey = (key) => {
    const errs = { ...errors };
    delete errs[key];
    setErrors(errs);
  };

  const setStatus = (newValue: PostStatusEnums): void => {
    setState({ ...state, status: newValue });
  };

  const validateState = () => {
    let valid = true;
    const errorData = {} as IPostModel;
    if (!state.title) {
      errorData.title = "Title is required.";
    }

    if (!content) {
      errorData.content = "Content is required.";
    }

    if (!state.category_id) {
      errorData.category_id = "Category is required.";
    }

    setErrors(errorData);
    valid = Object.keys(errorData).length <= 0;
    return valid;
  };

  const onSubmit = async () => {
    const canSubmit = validateState();

    if (canSubmit) {
      try {
        dispatch({ type: "loading-on" });
        if (props.mode === "ADD") {
          await onSubmitAdd();
        }

        if (props.mode === "EDIT") {
          await onSubmitEdit();
        }

        dispatch({ type: "loading-off" });
      } catch (e) {
        dispatch({ type: "loading-off" });
        dispatchMsgModal({
          type: "show",
          payload: {
            header: "Create post unsuccessful!",
            detail: "Something went wrong.",
            btnText: "OK",
            onClick: () => {},
          },
        });
      }
    }
  };

  const onSubmitAdd = async () => {
    const model = { ...state, content: content };
    await postsService.add(model);
    dispatchMsgModal({
      type: "show",
      payload: {
        header: "Create post successful",
        detail: "Your post has been successfully created.",
        btnText: "Got it, Thanks!",
        onClick: () => {
          navigate("/myposts");
        },
      },
    });
  };

  const onSubmitEdit = async () => {
    const model = { ...state, content: content };
    await postsService.edit(props.id, model);
    dispatchMsgModal({
      type: "show",
      payload: {
        header: "Edit post successful",
        detail: "Your post has been successfully edited.",
        btnText: "Got it, Thanks!",
        onClick: () => {
          navigate("/myposts");
        },
      },
    });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-4xl min-w-72 w-full">
        <h1 className="text-2xl mb-5 flex flex-row items-center">
          <ArrowLeftIcon
            className="w-5 h-5 mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          {props.mode} POST
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
            data={content}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                const viewEditableRoot = editor.editing.view.document.getRoot();
                if (viewEditableRoot)
                  writer.setStyle("height", "300px", viewEditableRoot);
              });
            }}
            onChange={(_, editor) => {
              setContent(editor.getData());
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
            value={state.category_id}
            onChange={(data) => setState({ ...state, category_id: data.id })}
          />
          {errors.category_id && (
            <div className="text-red-600">{errors.category_id}</div>
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
