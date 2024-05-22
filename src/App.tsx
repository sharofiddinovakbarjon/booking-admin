import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components";
import { Home, Login, Signup } from "@/pages";
import { useAppDispatch } from "./store/hooks/hooks";
import { setUserInfo } from "./store/bookingSlice/bookingSlice";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") + "");
      dispatch(setUserInfo(userInfo));
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
