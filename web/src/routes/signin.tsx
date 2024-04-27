import { useState } from "react";
import { useLoadingDispatch } from "../context/LoadingContext";
import { useMessageModalDispatch } from "../context/MessageModalContext";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useUserDispatch } from "../context/UserContext";
import Cookies from "universal-cookie";

interface ISigninForm {
  email: string;
  password: string;
}

export default function Signin() {
  const dispatchUser = useUserDispatch();
  const dispatchLoading = useLoadingDispatch();
  const dispatchMessageModal = useMessageModalDispatch();
  const navogate = useNavigate();
  const [errors, setErrors] = useState({} as ISigninForm);
  const [form, setForm] = useState<ISigninForm>({
    email: "",
    password: "",
  });

  const validateState = () => {
    let valid = true;
    const errorData = {} as ISigninForm;
    if (!form.email) {
      errorData.email = "Email is required.";
    }
    if (!form.password) {
      errorData.password = "Password is required.";
    }

    setErrors(errorData);
    valid = Object.keys(errorData).length <= 0;
    return valid;
  };

  const removeErrorByKey = (key) => {
    const errs = { ...errors };
    delete errs[key];
    setErrors(errs);
  };

  const onSubmit = async () => {
    const canSubmit = validateState();
    if (canSubmit) {
      try {
        dispatchLoading({ type: "loading-on" });
        const result = await authService.signin(form.email, form.password);
        dispatchLoading({ type: "loading-off" });
        const cookies = new Cookies(null, { path: "/" });

        cookies.set("profile", result.access_token);
        dispatchUser({
          type: "set",
          payload: { email: result.email },
        });
        navogate("/");
      } catch (e) {
        dispatchLoading({ type: "loading-off" });
        dispatchMessageModal({
          type: "show",
          payload: {
            header: "Signin unsuccessful!",
            detail: "Something went wrong.",
            btnText: "OK",
            onClick: () => {},
          },
        });
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-10 max-md:mt-2">
      <div className="max-w-md min-w-60 w-full flex justify-center flex-col shadow-lg px-10 py-5 rounded-md border">
        <h5 className="text-2xl font-bold mb-5">Sign In</h5>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
            maxLength={100}
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              removeErrorByKey("email");
            }}
          />
          {errors.email && <div className="text-red-600">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            required
            maxLength={100}
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              removeErrorByKey("password");
              removeErrorByKey("passwordagain");
            }}
          />
          {errors.password && (
            <div className="text-red-600">{errors.password}</div>
          )}
        </div>

        <div className="mb-4 mt-2 flex justify-between flex-row max-md:flex-col">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full px-4 h-10 border rounded-md text-white hover:bg-indigo-300 bg-indigo-600 flex items-center justify-center cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
