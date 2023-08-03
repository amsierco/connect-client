import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

// Components
import ErrorPage from './components/ErrorPage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import axios from './utils/axiosConfig';

const RouterController = () => {
  // User Auth token
  const [user_token, setToken] = useState();

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;
  });

  return (
    <BrowserRouter basename='/'>
      <Routes>
        {/* HOME ROUTE */}
        <Route
          path='/'
          element={
            !user_token ? 
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
        {/* 404 PAGE ROUTE */}
        <Route
          path='*'
          element={ <ErrorPage /> }
        />
      </Routes>
      </BrowserRouter>
  )
};

export default RouterController;