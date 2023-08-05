import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import ErrorPage from './components/ErrorPage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import PostForm from './components/PostForm/PostForm';
import Timeline from "./components/Timeline/Timeline";
import Profile from './components/Profile/Profile';
import Friends from './components/Friends/Friends';
import Notifications from './components/Notifications/Notifications';
import Search from './components/Search/Search';

// Utils
import ProtectedRoute from './utils/ProtectedRoute';

const RouterController = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        {/* LOGIN */}
        <Route path='/login' element={ <Login /> } />
        {/* SIGNUP */}
        <Route path='/signup' element={ <Signup /> } />

        {/* HOME */}
        <Route path='/' element={ <ProtectedRoute><Home /></ProtectedRoute> }>
          {/* TIMELINE */}
          <Route path='' element={ <Timeline /> }/>
          {/* POST FORM */}
          <Route path='post-form' element={ <PostForm /> } />
          {/* PROFILE */}
          <Route path='profile/:id' element={ <Profile /> } />
          {/* FRIENDS */}
          <Route path='friends' element={ <Friends /> } />
          {/* NOTIFICATIONS */}
          <Route path='notifications' element={ <Notifications /> } />
          {/* SEARCH */}
          <Route path='search' element={ <Search /> } />
        </Route>

        {/* 404 PAGE */}
        <Route path='*'
          element={ <ErrorPage /> }
        />
      </Routes>
      </BrowserRouter>
  )
};

export default RouterController;