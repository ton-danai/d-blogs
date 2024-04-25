import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoading from "./components/loading";
import Root from "./routes/root";
import Home from "./routes/home";
import MyBlogs from "./routes/myblogs";
import NewPost from "./routes/myblogs/newblog";
import ErrorPage from "./error-page";

import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/myblogs",
        element: <MyBlogs />,
      },
      {
        path: "/myblogs/new",
        element: <NewPost />,
      },
    ],
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/register",
    element: <div>register</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LoadingProvider>
    <React.StrictMode>
      <GlobalLoading />
      <RouterProvider router={router} />
    </React.StrictMode>
  </LoadingProvider>
);
