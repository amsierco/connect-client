import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


// Components
import ErrorPage from './ErrorPage';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

const Router = () => {
  // Login token
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }

  const router = createBrowserRouter([
    {
      // Router configs
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    // {
    //   path: "profile/:name",
    //   element: <Profile />,
    // },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;