import React, { useState } from 'react';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"


// Components
import ErrorPage from './ErrorPage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';

const RouterController = () => {
  // User Auth token
  const [token, setToken] = useState();

  return (
    <BrowserRouter basename='/'>
      <Routes>
        {/* HOME ROUTE */}
        <Route
          path='/'
          element={
            !token ? 
            <Navigate to='/login' /> :
            <Home />
          }
        />
        {/* LOGIN ROUTE */}
        <Route
          path='/login'
          element={ <Login setToken={setToken} /> }
        />
        {/* SIGNUP ROUTE */}
        <Route
          path='/signup'
          element={ <Signup setToken={setToken} /> }
        />
      </Routes>
      </BrowserRouter>
  )
};

export default RouterController;