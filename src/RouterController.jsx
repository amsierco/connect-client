import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import ErrorPage from './components/ErrorPage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';

// Utils
import ProtectedRoute from './utils/ProtectedRoute';

const RouterController = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        {/* LOGIN */}
        <Route path='/login'
          element={ <Login /> }
        />
        {/* SIGNUP */}
        <Route path='/signup'
          element={ <Signup /> }
        />
        {/* HOME */}
        <Route path='/'
          element={ 
            <ProtectedRoute>
              <Home /> 
            </ProtectedRoute>
          }
        />
        {/* 404 PAGE */}
        <Route path='*'
          element={ <ErrorPage /> }
        />
      </Routes>
      </BrowserRouter>
  )
};

export default RouterController;