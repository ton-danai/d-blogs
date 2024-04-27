import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { MessageModalProvider } from "./context/MessageModalContext";
import { UserProvider } from "./context/UserContext";
import GlobalLoading from "./components/loading";
import MessageModal from "./components/messageModal";
import Root from "./routes/root";
import Home from "./routes/home";
import MyPosts from "./routes/myposts";
import NewPost from "./routes/myposts/newpost";
import UpdatePost from "./routes/myposts/updatePost";
import ErrorPage from "./error-page";
import Register from "./routes/register";
import Signin from "./routes/signin";

import "./index.css";
import PostView from "./routes/postview";
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
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/post/:id",
        element: <PostView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LoadingProvider>
    <MessageModalProvider>
      <UserProvider>
        <React.StrictMode>
          <GlobalLoading />
          <MessageModal />
          <RouterProvider router={router} />
        </React.StrictMode>
      </UserProvider>
    </MessageModalProvider>
  </LoadingProvider>
);
