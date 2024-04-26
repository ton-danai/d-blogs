import { useState } from "react";
import { useLoadingDispatch } from "../context/LoadingContext";
import { useMessageModalDispatch } from "../context/MessageModalContext";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

interface IRegisterForm {
  email: string;
  password: string;
  passwordagain: string;
}

export default function Register() {
  const dispatchLoading = useLoadingDispatch();
  const dispatchMessageModal = useMessageModalDispatch();
  const navogate = useNavigate();
  const [errors, setErrors] = useState({} as IRegisterForm);
  const [form, setForm] = useState<IRegisterForm>({
    email: "",
    password: "",
    passwordagain: "",
  });

  const validateState = () => {
    let valid = true;
    const errorData = {} as IRegisterForm;
    if (!form.email) {
      errorData.email = "Email is required.";
    } else {
      const emailValidate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!emailValidate.test(form.email)) {
        errorData.email = "Email is not email.";
      }
    }

    if (!form.password) {
      errorData.password = "Password is required.";
    }

    if (!form.passwordagain) {
      errorData.passwordagain = "Password Again is required.";
    }

    if (
      form.passwordagain &&
      form.password &&
      form.password !== form.passwordagain
    ) {
      errorData.password = "Password is not match.";
      errorData.passwordagain = "Password Again is is not match.";
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
        await userService.register(form.email, form.password);
        dispatchLoading({ type: "loading-off" });
        dispatchMessageModal({
          type: "show",
          payload: {
            header: "Registeration successful",
            detail: "Your Registeration has been successfully.",
            btnText: "Got it, Thanks!",
            onClick: () => {
              navogate("/signin");
            },
          },
        });
      } catch (e) {
        dispatchLoading({ type: "loading-off" });
        dispatchMessageModal({
          type: "show",
          payload: {
            header: "Registeration unsuccessful!",
            detail: "Something went wrong.",
            btnText: "OK",
            onClick: () => {},
          },
        });
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-md min-w-60 w-full flex justify-center flex-col shadow-lg px-10 py-5  rounded-md border">
        <h5 className="text-2xl font-bold mb-5">Register</h5>
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password again
          </label>
          <input
            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password_again"
            type="password"
            placeholder="Password Again"
            required
            maxLength={100}
            value={form.passwordagain}
            onChange={(e) => {
              setForm({ ...form, passwordagain: e.target.value });
              removeErrorByKey("password");
              removeErrorByKey("passwordagain");
            }}
          />
          {errors.passwordagain && (
            <div className="text-red-600">{errors.passwordagain}</div>
          )}
        </div>
        <div className="mb-4 mt-2 flex justify-between flex-row max-md:flex-col">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full px-4 h-10 border rounded-md text-white hover:bg-indigo-300 bg-indigo-600 flex items-center justify-center cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
