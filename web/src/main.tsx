import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { MessageModalProvider } from "./context/MessageModalContext";
import GlobalLoading from "./components/loading";
import MessageModal from "./components/messageModal";
import Root from "./routes/root";
import Home from "./routes/home";
import MyPosts from "./routes/myposts";
import NewPost from "./routes/myposts/newpost";
import UpdatePost from "./routes/myposts/updatePost";
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
        path: "/myposts",
        element: <MyPosts />,
      },
      {
        path: "/myposts/new",
        element: <NewPost />,
      },
      {
        path: "/myposts/:id",
        element: <UpdatePost />,
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
    <MessageModalProvider>
      <React.StrictMode>
        <GlobalLoading />
        <MessageModal />
        <RouterProvider router={router} />
      </React.StrictMode>
    </MessageModalProvider>
  </LoadingProvider>
);
